import { useEffect, useRef, useState } from "react";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../components/Typhography/TyphographySpan.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import Input from "../../components/Input/Input.jsx";
import BottomButton from "../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../components/FixedBox/FixedCenterBox.jsx";
import { checkLoginAbled, loginBtnFun } from "./index.jsx";
import { isLoginFun } from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { UrlMap } from "../../data/GlobalVariable.js";

const Login = () => {
  const navigate = useNavigate();
  const tel = useRef("");
  const password = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const isLogin = isLoginFun();
    if (isLogin) navigate(UrlMap.scheduleCreatePageUrl);
  });

  return (
    <MobileLayout>
      <Margin height="40px" />
      <Flex kind="flexCenter">
        <Typography font="bold32">
          HAUL YOUR NEED
          <TypographySpan color="subColor">.</TypographySpan>
        </Typography>
      </Flex>
      <Margin height="83px" />
      <Typography font="bold24">로그인 하기</Typography>
      <Margin height="10px" />
      <Typography font="bold16" color="subColor">
        안녕하세요 기사님. 좋은 하루입니다.
      </Typography>
      <Margin height="36px" />
      <form>
        <Input
          size="big"
          type="tel"
          placeholder="Phone Number "
          onChange={({ target: { value } }) => {
            tel.current = value;
            checkLoginAbled({
              tel: tel.current,
              password: password.current,
              isButtonDisabled: isButtonDisabled,
              setButtonDisabled: setButtonDisabled
            });
          }}
        />
        <Margin height="20px" />
        <Input
          size="big"
          type="password"
          placeholder="Password "
          onChange={({ target: { value } }) => {
            password.current = value;
            checkLoginAbled({
              tel: tel.current,
              password: password.current,
              isButtonDisabled: isButtonDisabled,
              setButtonDisabled: setButtonDisabled
            });
          }}
        />
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            loginBtnFun({ tel: tel.current, password: password.current });
          }}
        >
          로그인하기
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};

export default Login;