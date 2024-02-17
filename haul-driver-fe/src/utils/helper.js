export const isEmptyString = value => {
  return value.length === 0;
};

export const isNumber = value => {
  return !isNaN(value);
};

export const isPositiveNumber = value => {
  return Number(value) > 0;
};

// 문자열이 이메일 형식인지 확인해주는 함수
export const checkEmail = email => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
};

// 문자열이 전화번호 형식인지 확인해주는 함수 01012341234 010-3977-2337 둘다 가능함
export function isPhoneNumber(input) {
  const regPhone = /^(01[016789]|02|[0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;
  if (regPhone.test(input)) {
    const cleanedNumber = input.replace(/-/g, "");
    return cleanedNumber;
  }
  return false;
}