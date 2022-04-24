// Simple helper function for allowing buttons of a given id go to a requested page
const setupLink = (elementId, url) => {
  document.querySelector(`#${elementId}`).addEventListener('click', () => {
    chrome.tabs.create({ url });
    
  });
  
}

// These buttons pull up each of the main pages
setupLink('goto-reminders', 'index.html#follow-up');
setupLink('goto-networks', 'index.html#my-networks');
setupLink('goto-templates', 'index.html#templates');

// Goto Linkedin button: Open a new tab to the specified linkedin link
document.querySelector('#goto-linkedin').addEventListener('click', async () => {
  await chrome.storage.sync.set({'liImporting': true});
  let tab = await chrome.tabs.create({
    active: true,
    url: 'https://www.linkedin.com/mynetwork/invite-connect/connections/'
  });
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['sidebar.js']
  //   // function: handleLinkedInPage,
  // });
  // setupRequestIntercept(tab);
});

const handleEntry = entry => {
  chrome.tabs.create({
    active: true,
    url: entry.link
  }, tab => {
    console.log(`Loaded tab for ${entry.name} with index ${tab.id}/${tab.status}`)
  });
}

const handleLinkedInPageUser = () => {

  function extractContactInfo(doc) {
    const mailLink = doc.querySelector('.ci-email .pv-contact-info__contact-link');
    return { email: mailLink == null ? null : mailLink.href.slice(7) };
  }

  // Import flow
  // 1. Initiate LinkedIn import (Import from LinkedIn)
  // 2. Open tab with known ID with list of connections
  // 3. Inject script to open sidebar
  // 4. Background script receives intercepted csrf token and sends it to the sidebar
  // 5. Sidebar asks for list of all connections and populates multiselect list
  // 6. User selects connections to import
  // 7. Sidebar uses internal API to ask for connections' information
  // 8. Sidebar sends message (?) to background script to store connections' information
}

const handleLinkedInPageList = () => {

  function extractContactInfo(doc) {
    const mailLink = doc.querySelector('.ci-email .pv-contact-info__contact-link');
    return { email: mailLink == null ? null : mailLink.href.slice(7) };
  }

  const links = Array.from(document.querySelectorAll('.mn-connection-card__link'));
  const entries = links.map(link => ({
    name: link.querySelector('.mn-connection-card__name').innerText,
    occupation: link.querySelector('.mn-connection-card__occupation').innerText,
    link: link.href
  })).slice(0, 1);
  // entries = entries.slice(0, 3);
  console.log(entries); // debug

  // Go to each page
  entries.forEach((entry, i) => {
    chrome.tabs.create({
      active: true,
      url: `${entry.link}overlay/contact-info/`
    }, tab => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: handleLinkedInPageUser,
      });
    });
    let windowRef = window.open(entry.link + 'overlay/contact-info/', '_blank');

    let ref = setInterval(() => {
      // const contactInfoLink = windowRef.document.querySelector('#top-card-text-details-contact-info');
      // We need to click that link to pull up the Contact Info page
      // contactInfoLink.click();
      windowRef.alert(JSON.stringify(extractContactInfo(windowRef.document)));
      // alert(windowRef.document.querySelector('#top-card-text-details-contact-info').textContent)

    }, 200)
    // This page has
    // https://www.linkedin.com/in/simarpreet-singh-84a599190/overlay/contact-info/
  });
}

class LinkedInApi {
  constructor(csrfToken) {
    this.csrf = csrfToken;
  }
  async #fetchWithCsrf(url) {
    const req = await fetch(url, {headers: {'csrf-token': this.csrf}});
    if (!req.ok) {
      throw new Error('LinkedIn API fetch failed');
    }
    return await req.json();
  }

  async fetchAllConnections() {
    return await this.#fetchWithCsrf('https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-15&count=1000&q=search&sortType=RECENTLY_ADDED&start=0');
  }

  async fetchContactInfo(userId) {
    return await this.#fetchWithCsrf(`https://www.linkedin.com/voyager/api/identity/profiles/${userId}/profileContactInfo`);
  }
}

function setupRequestIntercept(tabId) {
  const listener = chrome.webRequest.onSendHeaders.addListener(function (details) {
    const header = details.requestHeaders.filter(i => i.name === 'csrf-token')[0];
    if (header !== undefined) {
      console.log('the csrf token is ' + header.value);
      chrome.storage.local.set({csrf: header.value});
      chrome.tabs.sendMessage(tabId, {csrf: header.value});
      chrome.webRequest.onSendHeaders.removeListener(listener);
    } else {
      console.info('no header entry with csrf-token');
    }
  }, { urls: ["<all_urls>"] }, ["requestHeaders"]);
}

const handleLinkedInPage = () => {
  const links = Array.from(
    document.querySelectorAll(".mn-connection-card__link"),
  );
  const entries = links.map((link) => ({
    name: link.querySelector(".mn-connection-card__name").innerText,
    occupation: link.querySelector(".mn-connection-card__occupation").innerText,
    link: link.href,
  })).slice(0, 3);
  // entries = entries.slice(0, 3);
  console.log(entries); // debug

  chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log({req, sender, res});
  });
  // // Go to each page
  // entries.forEach((entry, i) => {
  //   let windowRef = window.open(entry.link, "_blank");
  //   setTimeout(() => {
  //     alert(
  //       windowRef.document.querySelector("#top-card-text-details-contact-info")
  //         .textContent,
  //     );
  //   }, 2000);
  //   // This page has
  //   // https://www.linkedin.com/in/simarpreet-singh-84a599190/overlay/contact-info/
  // });
};
