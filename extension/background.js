let baseData = {
    contacts: [],
};

// Initialize the database for a new user

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'plinq': baseData });
  console.log('Initialized Plinq database!');
});

function setupRequestIntercept() {
  const listener = chrome.webRequest.onSendHeaders.addListener(function (details) {
    const header = details.requestHeaders.filter(i => i.name === 'csrf-token')[0];
    if (header !== undefined) {
      console.log('the csrf token is ' + header.value);
      chrome.storage.local.set({csrf: header.value});
      chrome.tabs.sendMessage(details.tabId, {module: 'liImport', topic: 'csrfToken', value: header.value});
      chrome.webRequest.onSendHeaders.removeListener(listener);
    } else {
      console.info('no header entry with csrf-token');
    }
  }, { urls: [/*"*://*.linkedin.com/*"*/ "<all_urls>"] }, ["requestHeaders"]);
}

setupRequestIntercept();