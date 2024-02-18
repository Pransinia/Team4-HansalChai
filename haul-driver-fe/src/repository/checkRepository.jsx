const dummyPlanData = [
  {
    id: 0,
    status: "before",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "10000"
  },
  {
    id: 1,
    status: "moving",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "5000"
  },
  {
    id: 2,
    status: "after",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "1"
  }
];

const dummyCustomerList = [
  {
    phase: "before",
    name: null,
    tel: null,
    picture: null
  },
  {
    phase: "reserv",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  },
  {
    phase: "moving",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  },
  {
    phase: "after",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  }
];

const dummyMapList = [
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  },
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  },
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  }
];

const dummyDetailData = id => {
  return {
    customer: dummyCustomerList[id],
    src: dummyMapList[id].src,
    dst: dummyMapList[id].dst,
    cost: dummyMapList[id].fee,
    requiredTime: dummyMapList[id].time,
    phase: "before"
  };
};

export async function getDriverDummySummaryList({ page, keyword }) {
  try {
    return {
      success: true,
      data: {
        lastPage: false,
        list: [
          ...dummyPlanData,
          ...dummyPlanData,
          ...dummyPlanData,
          dummyPlanData[0]
        ]
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getDriverSummaryList({ page, keyword = "운송 전" }) {
  try {
    const response = await fetch(
      `http://43.201.240.238:8080/api/v1/orders/mine?keyword=${keyword}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
    if (!response.ok) {
      return { success: false, message: "정보를 불러오지 못했어요." };
    }
    const body = await response.json();
    const list = body.data.orderInfoDTOS.map(v => {
      return {
        orderId: v.orderId,
        src: v.src,
        dst: v.dst,
        time: v.datetime,
        cost: v.cost
      };
    });
    //console.log(list);
    return {
      success: true,
      data: {
        list,
        lastPage: body.data.lastPage
      }
    };
  } catch (error) {
    return { success: false, error, message: "정보를 불러오지 못했어요." };
  }
}

export async function getUserReservationDetails({ checkID }) {
  try {
    return { success: true, data: { ...dummyDetailData(checkID) } };
  } catch (error) {
    console.error(error);
  }
}