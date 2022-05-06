/*
  firstName
  lastName
  picture
  email
  phone
  linkedIn
  contactHistory
*/
let baseData = {
    contacts: [],
};

// Initialize the database for a new user

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'plinq': baseData });
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

// setupRequestIntercept();

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  console.info('got message', msg);
  if (msg.module === 'liImport') {
    if (msg.topic === 'enabled?') {
      async function res() {
        const enabled = (await chrome.storage.local.get('liImporting')).liImporting;
        if (enabled) {
          await chrome.storage.local.set({liImporting: false});
        }
        respond({value: enabled});
        console.info('responded with', {value:enabled});
      }
      res();
      return true;
    } else if (msg.topic === 'existing?') {
      async function res() {
        const store = (await chrome.storage.local.get('plinq')).plinq;
        const out = [];
        for (let i = 0; i < msg.query.length; ++i) {
          if (store.contacts.some(ct => ct.linkedIn === 'https://www.linkedin.com/in/' + encodeURIComponent(msg.query[i]))) {
            out.push(i);
          }
        }
        respond({existing: out});
      }
      res();
      return true;
    } else if (msg.topic === 'upsert') {
      async function res() {
        const store = (await chrome.storage.local.get('plinq')).plinq;
        const updatingLinkedInUrls = new Set();
        for (const item of msg.items) {
          if (item.linkedIn) {
            updatingLinkedInUrls.add(item.linkedIn);
          }
        }
        const newStore = store.contacts
          .filter(ct => ct.linkedIn == undefined || !updatingLinkedInUrls.has(ct.linkedIn))
          .concat(msg.items);
        await chrome.storage.local.set({plinq: {...store, contacts: newStore}});
        respond({status: 'ok'});
      }
      res();
      return true;
    }
  }
});

// Communications with LinkedIn sidebar
// Step 1: who in this list is already imported? Page sends LinkedIn IDs, extension returns indices of those added.
// Step 2: add some users/remove some users. Page sends [ {firstName, lastName, email, phone, linkedIn} ] extension returns list of failures