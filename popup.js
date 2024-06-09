document.addEventListener('DOMContentLoaded', () => {
    const openSidebarButton = document.getElementById('open-sidebar');
    if (openSidebarButton) {
      openSidebarButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openSidebar' });
        window.close();
      });
    }
  });