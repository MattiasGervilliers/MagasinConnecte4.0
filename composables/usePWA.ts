export const usePWA = () => {
  const checkIfPWAIsUsed = () => {
    let displayMode = "browser tab";
    if (window.matchMedia("(display-mode: standalone)").matches) {
      displayMode = "standalone";
    }

    // Check if the app is in standalone mode (PWA)
    return displayMode === "standalone";
  };

  return { checkIfPWAIsUsed };
};
