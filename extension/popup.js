// Goto Main button: Open up the application page (HTML) for Plinq
document.querySelector('#goto-main').addEventListener('click', () => {
  chrome.tabs.create({ url: 'app.html' });
});

// Save this User button: Quickly grab info and save it
document.querySelector('#save-user').addEventListener('click', async () => {
  console.log('Saving user!')
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  tab = tab.window
  // tab.console.log('Hey tab im saving you!')
  const source = id => tab.document.querySelector('#' + id).textContent;

  function extractContactInfo(doc) {
    const mailLink = doc.querySelector('.ci-email .pv-contact-info__contact-link');
    return { email: mailLink == null ? null : mailLink.href.slice(7) };
  }
  contact = {};
  contact.name = source('pv-contact-info');
  contact.email = extractContactInfo(tab.document).email;
  chrome.storage.sync.get('plinq', ({'plinq': data}) => {
    data.contacts.push(contact);
    chrome.storage.sync.set({ 'plinq': data });
  });
});

// Goto Linkedin button: Open a new tab to the specified linkedin link
document.querySelector('#goto-linkedin').addEventListener('click', () => {
  chrome.tabs.create({
    active: true,
    url: 'https://www.linkedin.com/mynetwork/invite-connect/connections/'
  });
});

document.querySelector('#load-users').addEventListener('click', async () => {

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleLinkedInPageList,
  });

})

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

function setupRequestIntercept() {
  chrome.webRequest.onSendHeaders.addListener(function (details) {
    const header = details.requestHeaders.filter(i => i.name === 'csrf-token')[0];
    if (header !== undefined) {
      console.log('the csrf token is ' + header.value);
    } else {
      console.info('no header entry with csrf-token');
    }
  }, { urls: ["<all_urls>"] }, ["requestHeaders"]);
}
setupRequestIntercept();