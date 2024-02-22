export const BeforeInstallPromptEvent = {
  platforms: [],
  userChoice: Promise({
    outcome: "", //'accepted' | 'dismissed';
    platform: "" //string;
  }),
  preventDefault: () => {}, // () => void;
  prompt: () => {} // () => Promise<void>;
};
/*
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
*/
