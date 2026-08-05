# Hướng dẫn kiểm thử Ticket 04

Ticket 04 — **Complete the two-outcome Permission Generation Run** — cần chứng minh rằng một bound Catalog Test Specification hợp lệ tạo đúng một Suite chứa hai Test hoàn chỉnh: một Accessible Test và một Inaccessible expected-failure probe. Hai Test phải dùng đúng structured Permission Design, cùng Service Portal surface, giữ nguyên native ATF status và không tự động chạy.

## 1. Chuẩn bị instance

1. Build và cài phiên bản hiện tại của ứng dụng lên Australia instance bằng auth profile do người vận hành quản lý.
2. Xác nhận plugin `com.glide.automated_testing_impl.service_catalog_portal` đang active. Ứng dụng không tự kích hoạt hoặc khai báo hard dependency cho plugin này.
3. Xác nhận các source constants vẫn trỏ tới OOB Service Portal và Catalog Item Page của instance:
   - Portal `/sp`: `81b75d3147032100ba13a5554ee4902b`
   - Page `sc_cat_item`: `9f12251147132100ba13a5554ee490f4`
4. Xác nhận hai fixture users còn tồn tại và active:
   - Accessible: `d8f57f140b20220050192f15d6673a98`
   - Inaccessible: `6816f79cc0a8016401c5a33be04be441`

## 2. Chạy packaged generation-service acceptance test

Mở [Ticket 04 - bound run creates complete Accessible and Inaccessible graphs](https://INSTANCE.service-now.com/sys_atf_test.do?sys_id=0aca97a420494e289fc6cce0445868ea), chọn **Run Test**, rồi chạy bằng runner phù hợp của instance.

Kết quả cần là **Passed**. Server-side step sẽ gọi public generation-service seam và tự kiểm tra:

- đúng một new active Suite được tạo và không có extra generated Suite cho run;
- Suite name chứa Catalog Item, Specification number/version và run stamp;
- đúng hai new active Tests được tạo, không có extra/orphan generated Test và không bật parameterized/automatic execution;
- Accessible name chứa `ACCESSIBLE` và run stamp;
- Inaccessible name và description đều chứa `INACCESSIBLE - EXPECTED STEP FAILURE`; name đồng thời chứa run stamp;
- mỗi Test có đúng hai ordered OOB steps: **Impersonate** rồi **Open a Catalog Item (SP)**;
- Accessible dùng exact Accessible Representative Test User;
- Inaccessible dùng exact Inaccessible Representative Test User;
- cả hai dùng cùng hardcoded Portal, Page và Catalog Item Under Test;
- đúng hai Suite memberships tồn tại, Accessible ở order `1` và Inaccessible ở order `2`;
- names/descriptions không sử dụng Short Description hoặc Article Body làm expected behavior;
- descriptions chứa run stamp, Catalog Item, bound Specification, requester, expectation, relevant User Criteria, relevant Representative Test User và Service Portal surface; Accessible/Inaccessible descriptions dùng hai outcome-specific User Criteria khác nhau của fixture;
- không có `sys_atf_test_result` nào được tạo tự động.

Packaged test cố ý giữ lại generated Suite và hai generated Tests để người kiểm thử có thể xem và chạy thủ công. Tìm chúng bằng run stamp trong output message của server-side step.

## 3. Kiểm tra graph trong OOB ATF administration

Mở generated Suite từ run stamp và xác nhận:

1. Suite active và không có lịch/chạy tự động do ứng dụng tạo.
2. Suite có đúng hai memberships.
3. Accessible membership trỏ tới Test đã có đủ hai steps và input values.
4. Inaccessible membership trỏ tới Test đã có đủ hai steps và input values.
5. Không có custom assertion step, DOM inspection, denial classifier hoặc result-inversion artifact.
6. Descriptions hiển thị đầy đủ human-readable và technical provenance; User Criteria chỉ được ghi nhận làm provenance.

## 4. Chạy Accessible Test

Mở generated Accessible Test, chạy thủ công và kiểm tra native result:

- **Passed/green** khi OOB open step mở được Catalog Item: permission expectation được thỏa mãn.
- **Failed/red** khi OOB open step không mở được Catalog Item: permission expectation bị vi phạm.

Không có post-processing hoặc result inversion.

## 5. Chạy Inaccessible expected-failure probe

Mở generated Inaccessible Test và chạy thủ công. Diễn giải native result đúng theo POC:

- **Failed/red** ở OOB open step: ghi nhận thủ công là expected inaccessible evidence.
- **Passed/green** ở OOB open step: ghi nhận thủ công là unexpected access và permission expectation bị vi phạm.

Không đổi Failed thành Passed. Trong POC này, access denial, Portal error, widget error, JavaScript error, bad configuration hoặc timeout đều có thể làm open step Failed và đều được tính thủ công là inaccessible evidence; không phân loại nguyên nhân tự động.

## 6. Bằng chứng để human-accept

Lưu lại:

- Passed result của packaged Ticket 04 acceptance test.
- Run stamp và links/sys_ids của generated Suite, Accessible Test và Inaccessible Test.
- Ảnh hoặc record evidence cho hai Suite memberships, bốn ordered steps và exact input values.
- Native result của Accessible Test cùng cách diễn giải.
- Native result của Inaccessible Test cùng cách diễn giải expected-failure probe.
