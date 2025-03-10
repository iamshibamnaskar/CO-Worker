chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "askcoworker",
        title: "Ask Co-Worker",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "askcoworker") {
        chrome.storage.local.set({ selectedText: info.selectionText }, () => {
            chrome.action.openPopup(); // Open the popup extension
        });
    }
});
