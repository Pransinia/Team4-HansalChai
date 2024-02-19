# List

<img width="200" alt="image" src="https://github.com/softeerbootcamp-3rd/Team4-HansalChai/assets/37495809/4a9a731c-5ac5-419b-9ee5-9fb08d6f2a39">

## 페이지 설명
로그인 상태로 네비게이션 바에서 예약 확인 버튼을 누르면 넘어올 수 있는 예약 확인 페이지입니다.<br/>

예약의 요약 정보를 확인할 수 있습니다.<br/>
요약 정보 상자를 눌러 상세 정보 페이지로 넘어갈 수 있습니다.

## 기능 설명
1. 예약의 요약 정보를 확인할 수 있습니다. <br/>확인할 수 있는 정보는 운송 수단, 운송 상태, 운송 일시, 운송 비용입니다.
2. 요약 정보 상자를 누르면 해당하는 예약의 상세 정보 페이지로 넘어갈 수 있습니다.
3. 예약 정보는 10개 단위로 로드되어 표시됩니다. <br/>예약 정보가 하나도 없다면 요약 정보 상자는 표시되지 않습니다.
4. 네비게이션 바의 더보기를 누르면 더보기 메뉴 페이지로,<br/>용달 신청을 누르면 용달 신청 페이지로 넘어갈 수 있습니다.

## SumaryItemBox

### 컴포넌트 설명
예약의 요약정보를 나타내는 박스입니다.

| 파라미터 | 타입 | 설명 |
|--------|-----|-----|
| status | string | 현재 예약의 진행상황을 나타내는 문자열입니다.|
| model | string | 배정된 차량의 차종입니다.|
| time | string | 예약된 운송 시작 시간입니다.|
| fee | string | 운송비용입니다.|

| 진행 상태 | status |
|-------|--------|
|  "매칭 중" | "before" |
|  "운송 전" | "reserv" |
|  "운송 중" | "moving" |
|  "운송 완료" | "after" |

## Skeleton

### 컴포넌트 설명
예약의 요약정보를 서버에서 받아올 동안 표시할 스켈레톤 요소입니다.

## InfiniteList

### 컴포넌트 설명
요약 정보 상자를 담아서 보여 줄 리스트 요소입니다.
10개 단위로 끊어서 로드하며, 로드 중에는 Skeleton을 표시하고<br/>모두 로드되었다면 "모두 보여드렸어요" 라는 문구를 리스트의 끝에 둡니다.