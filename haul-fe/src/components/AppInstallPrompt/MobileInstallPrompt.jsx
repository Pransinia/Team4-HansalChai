import styled from "styled-components";
import { MaxDeviceWidth } from "../../data/GlobalVariable.js";
import Margin from "../Margin/Margin";
import Typography from "../Typhography/Typhography.jsx";
import TypographySpan from "../Typhography/TyphographySpan.jsx";
import Flex from "../Flex/Flex.jsx";
import { useState } from "react";

const InstallPrompt = styled.dialog`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MaxDeviceWidth};
  border-radius: 16px 16px 0 0;
  border: 1px solid #000;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 -10px 10px 1px rgba(0, 0, 0, 0.1);
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

const CustomFlex = styled(Flex)`
  padding: ${({ padding }) => padding};
  gap: ${({gap}) => gap ?? "unset"};
`;

const PromptButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.font.medium16};
  background-color: ${({ theme, role }) =>
    theme.colors[role === "install" ? "mainColor" : "subColor"]};
  color: #fff;
`;

const MobileInstallPrompt = ({
  handleInstallClick,
  handleCancelClick,
  platform
}) => {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const isFirefoxDesktop =
    /Mozilla(\/[0-9]+\.[0-9] \()(Macintosh|Windows NT)/.test(
      window.navigator.userAgent
    );
  const [isOpen, setIsOpen] = useState(
    !isDeviceIOS && localStorage.getItem("iosInstalled") === "false"
  );

  const clickCancel = () => {
    setIsOpen(false);
    localStorage.setItem("iosInstalled", "false");

    handleCancelClick();
  };

  const clickInstall = () => {
    setIsOpen(false);
    handleInstallClick();
    isDeviceIOS ?? localStorage.setItem("iosInstalled", "true");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }

    promptEvent.prompt();
    // Show the install prompt.
    //promptEvent.prompt();
    // Log the result
    //const result = await promptEvent.userChoice;
    //console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    //window.deferredPrompt = null;
    // Hide the install button.
  };

  return (
    <InstallPrompt open={isOpen}>
      <Margin height="20px" />
      <CustomFlex kind="flexBetweenCenter" padding={"0 20px"}>
        <IconImage src="/icon_x192.png" width={72} alt="icon" />
        <Typography color="black" font="bold20">
          <TypographySpan color="mainColor" font="semiBold20">
            Haul
          </TypographySpan>
          을 설치하시겠어요?
        </Typography>
      </CustomFlex>
      <Margin height="20px" />
      {isDeviceIOS ? (
        <CustomFlex kind="flexCenter">
          <Typography font="semiBold14">
            IOS에서는 홈 화면에 추가 버튼을 눌러 설치할 수 있어요.
          </Typography>
        </CustomFlex>
      ) : (
        <CustomFlex kind="flexBetweenCenter" padding={"0 20px"} gap={"10px"}>
          <PromptButton onClick={clickInstall} role="install">
            설치할래요
          </PromptButton>
          <PromptButton onClick={clickCancel} role="cancel">
            웹으로 볼래요
          </PromptButton>
        </CustomFlex>
      )}
      <Margin height="20px"/>
    </InstallPrompt>
  )
}

export default MobileInstallPrompt;