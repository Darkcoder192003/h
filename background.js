// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'openSidebar') {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           files: ['content.js']
//         }, () => {
//           chrome.tabs.sendMessage(tabs[0].id, { action: 'openSidebar' });
//         });
//       });
//     }
//   });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'openSidebar') {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           files: ['content.js', 'sidebar.js']
//         }, () => {
//           chrome.tabs.sendMessage(tabs[0].id, { action: 'openSidebar' });
//         });
//       });
//     }
//   });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidebar') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js', 'sidebar.js']
        }, () => {
          chrome.tabs.sendMessage(tab.id, { action: 'openSidebar', url: url });
        });
      });
      console.log(`Sidebar created for URL: ${message.url}`);
    }
  });
  