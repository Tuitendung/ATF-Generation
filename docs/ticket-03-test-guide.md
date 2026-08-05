# Hướng dẫn kiểm thử Ticket 03

Ticket 03 — **Generate one Accessible Permission Test from the Catalog Item form** — cần chứng minh rằng người có quyền có thể bấm **Create ATF** trên Catalog Item, nhận phản hồi ngay trên cùng form, và một worker chạy bất đồng bộ tạo đúng một Accessible Test từ đúng Published Specification đã được chọn tại thời điểm bấm.

## Cách dùng các link ServiceNow

Các link bên dưới dùng hostname mẫu `https://INSTANCE.service-now.com`. Trước khi mở, thay `INSTANCE` bằng tên Australia demo instance đang dùng. Repo cố ý không lưu hostname hoặc thông tin xác thực của instance.

## Điều kiện tiên quyết

- Bản build mới nhất của ứng dụng **ATF Generation** đã được cài trên Australia demo instance.
- Plugin `com.glide.automated_testing_impl.service_catalog_portal` đang active.
- Người kiểm thử có role `atf_test_admin`.
- Catalog Item fixture **Standard Laptop** tồn tại: [mở Catalog Item](https://INSTANCE.service-now.com/sc_cat_item.do?sys_id=04b7e94b4f7b4200086eeed18110c7fd).
- Có đúng một Published Specification thuộc Knowledge Base **Catalog Test Specifications** cho Standard Laptop; Specification có `Schema Version = 1` và có **Accessible Representative Test User**. Dùng [danh sách Current Specification của Standard Laptop](https://INSTANCE.service-now.com/kb_knowledge_list.do?sysparm_query=kb_knowledge_base%3Dad51c081c2bb45cbbf74bc83396cbb05%5Ex_gemjp_atf_genera_catalog_item%3D04b7e94b4f7b4200086eeed18110c7fd%5Eworkflow_state%3Dpublished) để kiểm tra cardinality và dữ liệu trước khi chạy.

Nếu danh sách trên trả về 0 hoặc nhiều hơn 1 record thì chưa chạy happy path. Ticket 03 chỉ chấp nhận đúng một Current Specification.

## Kiểm thử tự động

### 1. Chạy test UI Action

Mở [Ticket 03 - Create ATF queues one bound Accessible Generation Run](https://INSTANCE.service-now.com/sys_atf_test.do?sys_id=7d57365d84864002a12a85e5b5085914), chọn **Run Test**, rồi khởi chạy bằng runner phù hợp của instance.

Kết quả mong đợi: **Passed**. Test này kiểm tra:

- UI Action là server-side form action trên `sc_cat_item` và được giới hạn bằng role `atf_test_admin`.
- Người không có role không nhìn thấy action và direct invocation bị từ chối trước bước lookup/enqueue.
- Người có role được redirect về đúng Catalog Item trong cùng cửa sổ.
- Form hiển thị `ATF Generation was queued.` cùng UTC run stamp.
- Event `x_gemjp_atf_genera.accessible.generate` nhận đúng Catalog Item làm record context, exact bound Specification trong `parm1`, run stamp trong `parm2`, và requester username trong audit identity.
- Script Action chỉ chuyển giao công việc cho generation service.

Test tự tạo rồi xóa Specification fixture và queued event của nó để giữ seam này độc lập với worker. Vì vậy không dùng test này để xác nhận background worker đã tạo Suite/Test.

### 2. Chạy test worker

Mở [Ticket 03 - bound worker creates one complete Accessible Test graph](https://INSTANCE.service-now.com/sys_atf_test.do?sys_id=17c18be1184b455fb655cd70592e5a00), chọn **Run Test**, rồi khởi chạy test.

Kết quả mong đợi: **Passed**. Output của server step phải nêu `sys_id` của Suite và Accessible Test vừa tạo. Test này kiểm tra:

- Worker đọc lại exact bound Specification, không chọn một Published Specification mới hơn.
- Schema Version vẫn là `1` và đúng Accessible Representative Test User được sử dụng.
- Một active Suite chứa đúng một active Accessible Test.
- Test không bật automatic/parameterized execution và không có `sys_atf_test_result` mới.
- Test có đúng hai step theo thứ tự: **Impersonate** rồi **Open a Catalog Item (SP)**.
- Step inputs trỏ đúng Representative Test User, OOB Service Portal, trang `sc_cat_item`, và Standard Laptop.

Test worker để lại Suite/Test vừa tạo làm bằng chứng kiểm tra. Ghi lại các `sys_id` trong output; việc dọn artifact là thao tác thủ công của `atf_test_admin`.

## Kiểm thử thủ công end-to-end

### 1. Chuẩn bị và ghi nhận Specification

Mở [Current Specification của Standard Laptop](https://INSTANCE.service-now.com/kb_knowledge_list.do?sysparm_query=kb_knowledge_base%3Dad51c081c2bb45cbbf74bc83396cbb05%5Ex_gemjp_atf_genera_catalog_item%3D04b7e94b4f7b4200086eeed18110c7fd%5Eworkflow_state%3Dpublished). Xác nhận chỉ có một record, `Schema Version = 1`, và ghi lại Specification number, `sys_id`, cùng Accessible Representative Test User.

### 2. Queue Generation Run từ Catalog Item

Mở [Standard Laptop](https://INSTANCE.service-now.com/sc_cat_item.do?sys_id=04b7e94b4f7b4200086eeed18110c7fd) trong Platform UI và bấm **Create ATF**.

Kết quả mong đợi:

- Action hiển thị vì người kiểm thử có `atf_test_admin`.
- Trình duyệt quay lại đúng form Standard Laptop, không mở ATF list, generated artifact, hay System Logs.
- Info message hiển thị chính xác tiền tố `ATF Generation was queued. UTC run stamp:`.
- Ghi lại UTC run stamp trong message để đối chiếu các record phía sau.

### 3. Kiểm tra queued event

Mở [event mới nhất của Standard Laptop](https://INSTANCE.service-now.com/sysevent_list.do?sysparm_query=name%3Dx_gemjp_atf_genera.accessible.generate%5Einstance%3D04b7e94b4f7b4200086eeed18110c7fd%5EORDERBYDESCsys_created_on).

Tìm record có run stamp vừa ghi và xác nhận:

- `Name = x_gemjp_atf_genera.accessible.generate`.
- `Instance` là Standard Laptop (`04b7e94b4f7b4200086eeed18110c7fd`).
- `Parm 1` là `sys_id` của exact Specification đã ghi ở bước 1.
- `Parm 2` bằng đúng UTC run stamp trên form.
- `Created by` là username của người bấm **Create ATF**.

Event được xử lý bất đồng bộ nên record có thể chuyển khỏi Ready queue nhanh. Nếu không còn thấy ở Event Log, dùng run stamp để tiếp tục đối chiếu Suite và log.

### 4. Kiểm tra Suite và Accessible Test được tạo

Sau khi worker xử lý xong, mở [Test Suites mới nhất](https://INSTANCE.service-now.com/sys_atf_test_suite_list.do?sysparm_query=ORDERBYDESCsys_created_on) và tìm Suite có đúng run stamp. Sau đó mở Suite và kiểm tra:

- Chỉ có một Suite cho lần bấm này.
- Suite active và không được cấu hình chạy tự động.
- Tên Suite chứa run stamp.
- Related List của Suite có đúng một Test membership.

Mở Accessible Test từ membership, hoặc dùng [Accessible Tests mới nhất](https://INSTANCE.service-now.com/sys_atf_test_list.do?sysparm_query=nameLIKEACCESSIBLE%5EORDERBYDESCsys_created_on), rồi xác nhận:

- Test active; tên chứa `ACCESSIBLE` và đúng run stamp.
- Automatic/parameterized execution bị tắt.
- Test thuộc đúng Suite vừa kiểm tra.
- Không có Test Result mới: generation chỉ tạo metadata, không tự chạy generated Test.

### 5. Kiểm tra step graph và input values

Trong Related List **Test Steps** của Accessible Test, xác nhận có đúng hai step:

1. Order `1`: **Impersonate**, input `user` bằng Accessible Representative Test User của exact Specification.
2. Order `2`: **Open a Catalog Item (SP)**, với các input:
   - `portal_id = 81b75d3147032100ba13a5554ee4902b` — OOB Service Portal `/sp`.
   - `page_id = 9f12251147132100ba13a5554ee490f4` — OOB `sc_cat_item` page.
   - `catalog_item = 04b7e94b4f7b4200086eeed18110c7fd` — Standard Laptop.

Nếu cần kiểm tra trực tiếp record, mở [ATF Steps mới nhất](https://INSTANCE.service-now.com/sys_atf_step_list.do?sysparm_query=ORDERBYDESCsys_created_on) và lọc thêm theo Test `sys_id` vừa ghi.

### 6. Xác nhận System-context boundary

Mở [Generate Accessible Permission Test Script Action](https://INSTANCE.service-now.com/sysevent_script_action.do?sys_id=65ab31b27e83496582584ed925829747) và đối chiếu lần xử lý event với Suite/Test vừa tạo. Xác nhận:

- Script Action active, lắng nghe event `x_gemjp_atf_genera.accessible.generate`, và chỉ gọi `AtfGenerationService` với Catalog Item, exact Specification, run stamp, cùng requester audit username.
- Script Action chạy theo System-context mặc định của event processor; source không gọi API impersonation.
- `Created by`/audit của generated Suite và Test phản ánh background System processing, không phải Representative Test User.
- Representative Test User chỉ xuất hiện trong input của generated **Impersonate** step.
- Generated Test chưa được thực thi và không có Test Result.

Ticket 03 chưa đưa stamped `[ATF-GEN]` logging vào phạm vi triển khai; logging chi tiết thuộc ticket **Make independent and partial Generation Runs diagnosable**. Vì vậy không dùng việc thiếu một log message làm tiêu chí fail Ticket 03.

## Kiểm thử quyền hiển thị thủ công

Impersonate một user không có `atf_test_admin`, sau đó mở lại [Standard Laptop](https://INSTANCE.service-now.com/sc_cat_item.do?sys_id=04b7e94b4f7b4200086eeed18110c7fd).

Kết quả mong đợi: nút **Create ATF** không hiển thị. Kết thúc impersonation ngay sau khi kiểm tra.

## Bằng chứng cần lưu

- Screenshot form Standard Laptop sau khi bấm action, gồm queued message và UTC run stamp.
- `sys_id`/screenshot của exact Published Specification.
- `sys_id`/screenshot event có cùng run stamp và Script Action xử lý event.
- `sys_id`/screenshot Suite, Accessible Test, hai ordered steps, và các input values.
- Screenshot chứng minh không có `sys_atf_test_result` được tạo cho generated Test.
- Kết quả **Passed** của hai packaged Ticket 03 ATF tests.

## Nguồn kiểm thử trong repo

- [Định nghĩa hai ATF tests](../src/fluent/tests/ticket-03-accessible-generation.now.ts)
- [UI Action integration script](../src/server/tests/ticket-03-create-atf-action.js)
- [Worker graph integration script](../src/server/tests/ticket-03-accessible-generation.js)
- [UI Action, Event và Script Action metadata](../src/fluent/accessible-atf-generation.now.ts)
