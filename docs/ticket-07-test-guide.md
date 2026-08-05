# Hướng dẫn nghiệm thu Ticket 07 trên Australia

Ticket 07 — **Validate the complete team-demo journey on Australia** — là bước nghiệm thu, đóng gói và ghi bằng chứng cho toàn bộ ATF Generation v1. Ticket này không mở rộng sản phẩm, không thay đổi native ATF result semantics và không thêm retry, rollback, cleanup hay cơ chế cấu hình mới.

## 1. Quy ước trạng thái bằng chứng

Chỉ dùng ba trạng thái sau trong tài liệu này:

- `verified locally`: đã kiểm tra trực tiếp từ source hoặc clean SDK build trong repository.
- `packaged for instance verification`: metadata/test đã có trong package, nhưng chưa có kết quả chạy trên Australia.
- `human verified`: người vận hành đã kiểm tra trên authenticated Australia instance và đã ghi bằng chứng cụ thể.

Không đổi một mục instance thành `human verified` chỉ vì source hoặc package trông đúng. Không ghi credentials, token, password, cookie hoặc file authentication vào repository.

## 2. Trạng thái tự động hiện tại

- [x] `verified locally` — Ticket 05 có implementation, packaged integration coverage và clean build evidence; Australia Passed result vẫn là bằng chứng riêng cần bổ sung.
- [x] `verified locally` — Ticket 06 có implementation, bounded integration oracle, syntax checks và clean build evidence; Australia Passed result vẫn là bằng chứng riêng cần bổ sung.
- [x] `verified locally` — clean ServiceNow SDK build hoàn tất.
- [x] `verified locally` — package chứa production metadata và toàn bộ 7 packaged ATF tests của Ticket 01–06.
- [x] `packaged for instance verification` — Ticket 05 packaged test: `41e0f1a295ad49b8a04233b12b47baa4`.
- [x] `packaged for instance verification` — Ticket 06 packaged test: `81ac6fcd47974449b7d60c514aeff667`.
- [ ] `human verified` — application đã được install/update trên Australia.
- [ ] `human verified` — toàn bộ team-demo journey bên dưới đã được thực hiện và có evidence.

## 3. Cách dùng các link ServiceNow

Các link dùng hostname mẫu `https://INSTANCE.service-now.com`. Thay `INSTANCE` bằng Australia demo instance đang được vận hành. Không thay placeholder trong repository bằng hostname nếu nhóm không muốn lưu hostname; tuyệt đối không thêm credentials vào URL.

## 4. Phiếu bằng chứng chung

Điền các trường sau trong một bản sao của mục này hoặc trong phần **Nhật ký bằng chứng** ở cuối tài liệu:

- Ngày/giờ và timezone:
- Người vận hành:
- Australia instance/release:
- Application version/install record:
- Specification number:
- Specification `sys_id`:
- Catalog Item name/`sys_id`:
- First run stamp:
- First queued event `sys_id`:
- First Suite `sys_id`:
- First Accessible Test `sys_id`:
- First Inaccessible Test `sys_id`:
- Accessible Test Result ID:
- Inaccessible Test Result ID:
- Second run stamp:
- Second Suite `sys_id`:
- Second Accessible Test `sys_id`:
- Second Inaccessible Test `sys_id`:
- Ticket 05 Test Result ID:
- Ticket 06 Test Result ID:
- Screenshot/link bundle:
- Ghi chú:

## 5. Install hoặc update application

Chỉ thực hiện bằng authentication được quản lý bên ngoài repository.

1. Xác nhận clean build/package đang dùng là build mới nhất.
2. Install/update **ATF Generation** bằng ServiceNow SDK hoặc quy trình release đã được phê duyệt.
3. Không dùng reinstall nếu việc đó có thể xóa metadata được tạo trên instance mà chưa được người dùng cho phép.
4. Không yêu cầu SDK tự mở browser nếu không cần thiết.
5. Mở application record và xác nhận scope/name:
   - Scope: `x_gemjp_atf_genera`
   - Scope ID: `4c6b7718ad6b40709b6243636b59e772`
   - Name: `ATF Generation`

Checklist và evidence:

- [ ] `human verified` — install/update thành công.
- Install timestamp:
- Install/update record hoặc log link:
- Application version/build identifier:
- Screenshot:
- Ghi chú:

## 6. Xác nhận plugin thủ công

Mở plugin administration và tìm plugin:

`com.glide.automated_testing_impl.service_catalog_portal`

- [ ] `human verified` — plugin đang `Active`.
- Plugin record/link:
- Screenshot:
- Người xác nhận:
- Thời điểm:

Không activate plugin tự động từ script, SDK build hoặc ATF Generation. Nếu plugin chưa active, dừng journey và chuyển việc activation cho người có thẩm quyền.

## 7. Xác nhận exact Portal/Page constants

Kiểm tra trực tiếp record trên Australia, không chỉ đọc comment trong source:

| Constant | Expected record | Expected value |
| --- | --- | --- |
| Portal | OOB Service Portal, URL suffix `sp` | `81b75d3147032100ba13a5554ee4902b` |
| Page | OOB Catalog Item page, ID `sc_cat_item` | `9f12251147132100ba13a5554ee490f4` |

Links:

- [Portal record](https://INSTANCE.service-now.com/sp_portal.do?sys_id=81b75d3147032100ba13a5554ee4902b)
- [Page record](https://INSTANCE.service-now.com/sp_page.do?sys_id=9f12251147132100ba13a5554ee490f4)

Checklist và evidence:

- [ ] `human verified` — Portal `sys_id`, display name và suffix `sp` đúng.
- [ ] `human verified` — Page `sys_id`, display name và page ID `sc_cat_item` đúng.
- Portal screenshot/link:
- Page screenshot/link:
- Nếu khác source constants, dừng nghiệm thu và ghi conflict; không tự ý đổi Design:

## 8. Xác nhận exact-one OOB ATF metadata

Mỗi lookup sau phải trả về đúng một active record.

### 8.1 Step Configurations

- [ ] `human verified` — đúng một active Step Configuration tên `Impersonate`.
- [ ] `human verified` — đúng một active Step Configuration tên `Open a Catalog Item (SP)`.

Ghi bằng chứng:

- Impersonate Step Configuration `sys_id`:
- Open a Catalog Item (SP) Step Configuration `sys_id`:
- Query/list links hoặc screenshots:

### 8.2 Mandatory input definitions

Mỗi definition phải active, mandatory, có `sys_class_name = atf_input_variable`, thuộc đúng Step Configuration và là reference tới đúng table:

| Step Configuration | Element | Reference table | Exact count |
| --- | --- | --- | --- |
| `Impersonate` | `user` | `sys_user` | 1 |
| `Open a Catalog Item (SP)` | `portal_id` | `sp_portal` | 1 |
| `Open a Catalog Item (SP)` | `page_id` | `sp_page` | 1 |
| `Open a Catalog Item (SP)` | `catalog_item` | `sc_cat_item` | 1 |

- [ ] `human verified` — `user` exact-one lookup.
- [ ] `human verified` — `portal_id` exact-one lookup.
- [ ] `human verified` — `page_id` exact-one lookup.
- [ ] `human verified` — `catalog_item` exact-one lookup.
- Definition `sys_id` values:
- Query/list links hoặc screenshots:

Nếu có zero hoặc multiple match, dừng trước generation. Không chọn record đầu tiên và không tạo fallback metadata.

## 9. Chuẩn bị Test Designer persona

Test Designer là trusted operator dùng để author/publish Design và click **Create ATF**.

- [ ] `human verified` — user có role `atf_test_admin`.
- [ ] `human verified` — user là Manager của Knowledge Base **Catalog Test Specifications** (`ad51c081c2bb45cbbf74bc83396cbb05`).
- [ ] `human verified` — user không được cấp `knowledge_admin` hoặc broad Knowledge administration authority chỉ để phục vụ demo này.
- Test Designer username/`sys_id`:
- Role evidence:
- Knowledge Base Managers evidence:
- Negative evidence cho broad Knowledge admin authority:

## 10. Author và Publish complete v1 Specification

1. Mở module **ATF Generation > Create New**.
2. Xác nhận form dùng view **Catalog Test Specification** và Knowledge Base mặc định là **Catalog Test Specifications**.
3. Author các structured fields:
   - Catalog Item;
   - Schema Version `1`;
   - Accessible User Criteria;
   - Accessible Representative Test User;
   - Inaccessible User Criteria;
   - Inaccessible Representative Test User.
4. Short Description và Article Body chỉ là human notes; generation không được parse chúng.
5. Save Draft, sau đó Publish bằng explicit immediate Publish action.
6. Xác nhận có đúng một Current Published Specification cho Catalog Item. Nếu đang thay version, Retire old trước rồi Publish replacement; không fallback về Draft.

Checklist và evidence:

- [ ] `human verified` — Draft được author với đầy đủ v1 structured Design.
- [ ] `human verified` — explicit Publish hoàn tất.
- [ ] `human verified` — exact-one Current Published Specification.
- Specification number:
- Specification `sys_id`:
- Catalog Item name/`sys_id`:
- Accessible Criteria/user:
- Inaccessible Criteria/user:
- Published screenshot/link:

## 11. First successful Create ATF click

1. Mở Catalog Item bằng Platform UI administrative form, không dùng trang Service Portal dành cho end user.
2. Xác nhận **Create ATF** hiện với Test Designer có `atf_test_admin`.
3. Click **Create ATF** một lần.
4. Xác nhận browser trở lại cùng Catalog Item form.
5. Ghi chính xác queued message và UTC run stamp.

Expected message:

`ATF Generation was queued. UTC run stamp: <YYYY-MM-DD HH:mm:ss>`

Checklist và evidence:

- [ ] `human verified` — UI Action hiện và click thành công.
- [ ] `human verified` — same-form redirect.
- [ ] `human verified` — queued message đúng và có UTC run stamp.
- First run stamp:
- Catalog Item screenshot chứa message:

## 12. Correlate event, stamped logs và generated graph

### 12.1 Queued event

Tìm event `x_gemjp_atf_genera.accessible.generate` của Catalog Item và run stamp vừa ghi:

- record context = exact Catalog Item;
- `parm1` = exact bound Specification `sys_id`;
- `parm2` = exact run stamp;
- `sys_created_by` = Test Designer username.

- [ ] `human verified` — event mapping/correlation đúng.
- Event `sys_id`/link:
- Screenshot:

### 12.2 Exact stamped log contract

Mọi message của run phải bắt đầu bằng `[ATF-GEN][<run stamp>]`.

Thứ tự successful run:

1. `Generation started`
2. `Created Test Suite: <suite sys_id>`
3. `Created Accessible Test: <test sys_id>`
4. `Created Accessible Impersonate Test Step: <step sys_id>`
5. một `Created Step Input Value: <input sys_id>` cho input được materialize
6. `Created Accessible Open a Catalog Item (SP) Test Step: <step sys_id>`
7. một message cho mỗi input value được materialize bởi OOB GlideVar
8. `Created Accessible Test Suite membership: <membership sys_id>`
9. cùng chuỗi created-artifact tương ứng cho Inaccessible Test
10. `Generation completed: Test Suite <suite sys_id> contains Accessible Test <test sys_id> and Inaccessible Test <test sys_id>`

- [ ] `human verified` — start, every created artifact và completion đều có exact run stamp.
- [ ] `human verified` — không có full JavaScript stack trace.
- [ ] `human verified` — không có dump toàn bộ bound Specification fields.
- System Log filter/link:
- Log export/screenshot:

### 12.3 Exact successful graph

First run phải có graph độc lập sau:

- 1 active Suite;
- 2 active Tests, không automatic/parameterized execution;
- Accessible Test: order `1` Impersonate + order `2` Open a Catalog Item (SP);
- Inaccessible Test: order `1` Impersonate + order `2` Open a Catalog Item (SP);
- exact Representative Test User cho từng Test;
- cùng exact Portal, Page và Catalog Item Under Test;
- tất cả required input values và OOB optional `query_params` nếu platform materialize nó;
- 2 Suite memberships: Accessible order `1`, Inaccessible order `2`;
- không có Test Result được tạo tự động.

- [ ] `human verified` — exactly one Suite/two Tests/four steps/all inputs/two memberships.
- [ ] `human verified` — names/descriptions chứa outcome labels, run stamp và approved provenance.
- [ ] `human verified` — membership chỉ tồn tại cho Test đã assemble đầy đủ.
- [ ] `human verified` — không có automatic Test execution.
- Suite `sys_id`/link:
- Accessible Test `sys_id`/link:
- Inaccessible Test `sys_id`/link:
- Four Step `sys_id` values:
- Step Input Value `sys_id` values:
- Two membership `sys_id` values:
- Graph screenshots:

## 13. Chạy và diễn giải native ATF results

### 13.1 Accessible Test

Chạy generated Accessible Test thủ công.

- [ ] `human verified` — successful OOB open có native ATF `Passed/green` và được ghi là Permission Expectation Satisfaction.
- [ ] `human verified` — quy ước đã được demo rõ: failed Accessible open là expectation violation, không phải expected evidence.
- Accessible Test Result ID/link:
- Native status:
- Screenshot/notes:

### 13.2 Inaccessible expected-failure probe

Chạy generated Inaccessible Test thủ công. Không invert kết quả.

- [ ] `human verified` — failed OOB open vẫn là native ATF `Failed/red` và được ghi thủ công là expected inaccessible evidence.
- [ ] `human verified` — quy ước đã được demo rõ: passed OOB open vẫn là native ATF `Passed/green` nhưng nghĩa là unexpected access/expectation violation.
- Inaccessible Test Result ID/link:
- Native status:
- Manual interpretation:
- Screenshot/notes:

Portal, widget, JavaScript, configuration error hoặc timeout cũng có thể làm negative open Failed và đều được v1 tính thủ công là inaccessible evidence; v1 không phân loại nguyên nhân.

### 13.3 Suite result

- [ ] `human verified` — nhóm đã quan sát/được demo rằng Suite có thể vẫn `Failed` theo thiết kế vì Inaccessible probe giữ native red result.
- [ ] `human verified` — không có automatic `2/2 passed` hoặc result inversion.
- Suite Result ID/link nếu có:
- Screenshot/notes:

## 14. Preflight failures với zero artifacts

Packaged Ticket 05 test là seam được ưu tiên:

[Ticket 05 - generation boundaries fail fast without ATF artifacts](https://INSTANCE.service-now.com/sys_atf_test.do?sys_id=41e0f1a295ad49b8a04233b12b47baa4)

Test này tạm thời thay đổi rồi restore OOB ATF metadata. Chỉ chạy trên isolated Australia demo instance, khi không có người khác đang sửa metadata đó. Không chạy nếu restore risk chưa được người vận hành chấp nhận.

- [ ] `human verified` — một UI Action preflight failure được chứng minh không queue event và không tạo Suite/Test/step/input/membership.
- Failure case đã dùng:
- Before/after artifact counts:
- Error message/screenshot:
- [ ] `human verified` — một worker OOB metadata preflight failure được chứng minh không tạo Suite/Test/step/input/membership.
- Metadata failure case đã dùng:
- Exact stamped preflight message:
- Before/after artifact counts:
- Ticket 05 Test Result ID/link:
- Restore evidence:

## 15. Ticket 06 packaged acceptance

Chạy:

[Ticket 06 - independent and partial Generation Runs are diagnosable](https://INSTANCE.service-now.com/sys_atf_test.do?sys_id=81ac6fcd47974449b7d60c514aeff667)

Test dùng public generation-service seam, structured insert observation trên package-private fault-injection seam, IDs trả về, diagnostic ledger và parent-bounded relationship queries. Test không parse generated names/descriptions làm lookup keys và không chụp toàn bộ các bảng ATF.

- [ ] `human verified` — packaged Ticket 06 test Passed.
- Test Result ID/link:
- Server-step output:
- Screenshot/log evidence:

Các partial graphs mà test xác nhận:

- Accessible assembly failure tại Open step: 1 Suite; 1 partial Accessible Test; 1 Impersonate step; 1 input value; 0 membership; không có Inaccessible Test.
- Inaccessible assembly failure tại Open step: 1 Suite; completed Accessible Test với 2 steps, 5 input values và membership order `1`; partial Inaccessible Test với 1 Impersonate step và 1 input value; 0 Inaccessible membership.

Không cleanup các material artifacts nếu chưa được người dùng yêu cầu.

## 16. Second independent successful click

1. Trở lại cùng Catalog Item và same Current Published Specification.
2. Click **Create ATF** lần thứ hai.
3. Ghi second run stamp.
4. Correlate second run tới một Suite và hai Tests mới.
5. So sánh `sys_id` với first run. Nếu hai click xảy ra cùng giây, display names có thể giống nhau; independence được chứng minh bằng `sys_id` khác nhau.

- [ ] `human verified` — second click tạo Suite mới và hai Test mới.
- [ ] `human verified` — không reuse/update/reconcile/delete first-run artifacts.
- Second run stamp:
- Second Suite `sys_id`:
- Second Accessible Test `sys_id`:
- Second Inaccessible Test `sys_id`:
- First/second comparison screenshot:

## 17. Xác nhận toàn bộ v1 non-goals

Đánh dấu từng mục chỉ sau khi inspect generated graph, production metadata và demo behavior:

- [ ] Không order, add to cart, submit hoặc fulfill Catalog Item.
- [ ] Không generate/validate variables, Variable Sets hoặc Multi-Row Variable Sets.
- [ ] Không infer expected behavior từ live Catalog implementation.
- [ ] Không parse Article Body hoặc dùng Short Description làm behavior oracle.
- [ ] Không dùng Now Assist, LLM, AI agent hoặc heuristic trong generation.
- [ ] Không evaluate User Criteria membership hoặc tự chọn/mutate Representative Test User.
- [ ] Không tạo custom Portal assertion, denial classifier hoặc result inversion.
- [ ] Không tự chạy Test, schedule Test hoặc tạo continuous execution surface.
- [ ] Không có persistent Generation Run, Generation Error hoặc queue table riêng.
- [ ] Không polling, progress UI, completion notification, retry hoặc resume.
- [ ] Không rollback, compensation, automatic deletion hoặc cleanup automation.
- [ ] Không deduplication, idempotency, reuse, reconcile hoặc update-in-place.
- [ ] Không hard dependency hoặc automatic activation cho portal ATF plugin.
- [ ] Không System Property/configuration UI cho Portal/Page constants.
- [ ] Không triển khai deferred future capability của Variables, UI Policies, Client Scripts, Script Includes hoặc Flows.

Evidence/notes:

## 18. Nhật ký bằng chứng

Không ghi secrets. Thêm một dòng cho mỗi evidence item.

| Thời điểm | Trạng thái | Hạng mục | Record/Test Result IDs hoặc link | Người xác nhận | Ghi chú |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 19. Điều kiện đóng Ticket 07 và ATF Generation v1

Ticket 07 chỉ được đánh dấu `Completion: complete` khi:

- clean build và package checks có bằng chứng local;
- install/update và toàn bộ prerequisite checks có evidence Australia;
- first journey, native results, both preflight failures và second independent click có evidence;
- v1 non-goals được xác nhận;
- Ticket 05 và Ticket 06 có Passed/Test Result evidence phù hợp trên Australia, hoặc tracker ghi rõ tiêu chí nào được người có thẩm quyền chấp nhận bằng evidence tương đương.

Nếu chưa có authenticated Australia access hoặc chưa có evidence instance, trạng thái đúng là `ready-for-human`, không phải complete.
