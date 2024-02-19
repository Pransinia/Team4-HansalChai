# CheckDetail

<img width="200" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/49d97ece-e0dc-4de8-8716-96ca87075d98">

## 페이지 설명
예약 상세정보를 확인할 수 있는 페이지입니다.<br/>
회원은 예약 리스트 중 하나를 선택하여 넘어올 수 있습니다.<br/>
비회원은 본인이 가진 예약 번호를 이용하여 넘어올 수 있습니다.

## 기능 설명
1. 배정된 기사 정보를 확인할 수 있습니다. 기사의 이름과 전화번호, 사진을 확인할 수 있습니다.<br/>기사가 배정되기 전에는 안내문구가 출력됩니다.
2. 제공받는 차량 정보를 확인할 수 있습니다. <br/>확인할 수 있는 정보는 차량의 사진, 차종, 나를 수 있는 최대 적재량, 너비, 길이, 높이입니다.
3. 비용과 예상 도착시간, 예상 이동 경로를 확인할 수 있습니다.
4. 헤더의 뒤로가기 버튼을 눌러 이전 페이지로 돌아갈 수 있습니다.
5. 네비게이션 바의 더보기를 누르면 더보기 메뉴 페이지로,<br/>용달 신청을 누르면 용달 신청 페이지로 넘어갈 수 있습니다.

## DriverInfoBox

### 컴포넌트 설명
배정된 기사의 정보를 출력하는 박스입니다.

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| phase | string | 현재 예약의 진행상황을 나타내는 문자열입니다.|
| name | string \| null | 배정된 기사의 이름입니다. 배정 전이면 null 입니다.|
| tel | string \| null | 배정된 기사의 전호번호입니다. 배정 전이면 null 입니다.|
| picture | string \| null | 배정된 기사의 사진 위치입니다. 배정 전이면 null 입니다.|

| 진행 상태 | phase |
|-------|--------|
|  "매칭 중" | "before" |
|  "운송 전" | "reserv" |
|  "운송 중" | "moving" |
|  "운송 완료" | "after" |