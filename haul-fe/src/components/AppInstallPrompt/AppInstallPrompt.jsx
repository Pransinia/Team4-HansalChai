import { useEffect, useState } from "react";
import MobileInstallPrompt from "./MobileInstallPrompt";
//import { BeforeInstallPromptEvent } from './BeforeInstallPromptEvent';

const defaultBeforeInstallPromptEvent = {
  // : BeforeInstallPromptEvent
  platforms: [],
  userChoice: Promise.resolve({ outcome: "dismissed", platform: "" }),
  prompt: () => Promise.resolve(),
  preventDefault: () => {}
};

const isIOSPromptActive = () => {
  const isActive = JSON.parse(localStorage.getItem("iosInstalled") || "true");

  if (isActive) {
    return defaultBeforeInstallPromptEvent;
  }

  return null;
};

export default function AppInstallPrompt() {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [deferredPrompt, setDeferredPrompt] = //useState<BeforeInstallPromptEvent | null>
    useState(isDeviceIOS ? isIOSPromptActive() : null);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const handleCancelClick = () => {
    localStorage.setItem("iosInstalled", "false");
    setDeferredPrompt(null);
  };

  const handleBeforeInstallPrompt = beforeInstallPromptEvent => {
    beforeInstallPromptEvent.preventDefault();
    setDeferredPrompt(beforeInstallPromptEvent);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (<>
      {deferredPrompt && (
        <MobileInstallPrompt
          handleInstallClick={handleInstallClick}
          handleCancelClick={handleCancelClick}
          platform={isDeviceIOS ? "ios" : "android"}
        />
      )}
    </>);
}