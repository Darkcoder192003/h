chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidebar') {
      if (!document.getElementById('sidebar-container')) {
        const sidebar = createSidebar(message.url);
        document.body.appendChild(sidebar);
      }
      console.log(`Sidebar created for URL: ${message.url}`);
    }
  });