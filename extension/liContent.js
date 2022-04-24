console.info('%cContent script loaded', 'color:blue');

function extractProfilePictureUrl(contact) {
  // our desired image size is 100
  try {
    const imgRoot = contact.profilePicture.displayImageReference.vectorImage;
    return imgRoot.rootUrl + imgRoot.artifacts.filter(i => i.width === 100)[0].fileIdentifyingUrlPathSegment;
  } catch (e) {
    console.warn('warning: failed to load profile picture for ', contact);
    return null;
  }
}

let api = undefined;

function sidebarHtml(contacts, existingIds) {
  console.log(contacts);
  const body = `
    <h1 class="t-24 t-black t-normal">Add from LinkedIn</h1>
    <div>
      <input class="artdeco-text-input--search artdeco-text-input--input" placeholder="Search by name..." type="search" id="plinq-control-search">
    </div>
    <button class="artdeco-button" style="margin:16px;align-self:flex-end" id="plinq-control-select-all">Add/Update All</button>
    <div>` + contacts.filter(it => it != undefined).map(ct => `<div id="plinq-user-block-${ct.publicIdentifier}" style="display: flex; align-items:center;background-color:var(--color-background-container)!important; border-radius: 8px; margin: 4px; padding: 8px;">
      <img style="width:50px;border-radius:25px;" class="${extractProfilePictureUrl(ct) == null ? 'ghost-person' : ''}" src="${extractProfilePictureUrl(ct) || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}" alt="profile picture for ${ct.firstName} ${ct.lastName}">
      <div style="margin-left:8px">
        <p class="t-16 t-normal t-bold">${ct.firstName} ${ct.lastName}</p>
      </div>
      <div style="margin-left: auto;display:flex;align-items:center;">
        <button class="artdeco-button plinq-control-toggle-user" data-user="${ct.publicIdentifier}">${existingIds.includes(ct.publicIdentifier) ? 'Update' : 'Add'}</button>
      </div>
    </div>`).join('') + `</div>`;
  return `
  <aside style="position:fixed;top:20px;right:20px;bottom:20px;min-width:350px;border-radius:1rem;background:var(--color-background-canvas)!important;border:2px solid #999;box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);padding:12px;z-index:10000000;overflow:scroll;display:flex;flex-direction:column;" id="plinq-importer">
    ${body}
  </aside>`;
}

const storage = {
  queryExisting(linkedInIds) {
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage({
        module: 'liImport',
        topic: 'existing?',
        query: linkedInIds
      }, response => {
        if (response.existing) {
          res(linkedInIds.filter((_, index) => response.existing.includes(index)));
        } else {
          rej('bad response from extension');
        }
      });
    });
  },
  upsert(profiles) {
    console.info(profiles);
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage({
        module: 'liImport',
        topic: 'upsert',
        items: profiles.map(prof => ({
          firstName: prof.firstName,
          lastName: prof.lastName,
          linkedIn: `https://www.linkedin.com/in/${prof.publicIdentifier}`,
          email: prof.contactInfo.emailAddress,
          phone: prof.contactInfo.phoneNumbers == undefined || prof.contactInfo.phoneNumbers.length == 0 ? undefined : prof.contactInfo.phoneNumbers[0].number,
          website: prof.contactInfo.websites == undefined || prof.contactInfo.websites.length == 0 ? undefined : prof.contactInfo.websites[0].url
        }))
      }, response => {
        if (response.status) {
          res(response.status === 'ok');
        } else {
          rej('no response from extension');
        }
      });
    });
  }
};

async function injectSidebar(contacts) {
  const existingIds = await storage.queryExisting(contacts.map(c => c.publicIdentifier));
  const html = sidebarHtml(contacts, existingIds);
  const mapById = Object.fromEntries(contacts.map(ct => [ct.publicIdentifier, ct]));
  const parser = new DOMParser();
  const elem = parser.parseFromString(html, 'text/html');
  document.body.appendChild(elem.body.children[0]);
  const checkboxes = Array.from(document.getElementsByClassName('plinq-user-selector'));
  document.getElementById('plinq-control-select-all').addEventListener('click', () => {
    for (const checkbox of checkboxes) {
      checkbox.checked = true;
    }
  });
  document.getElementById('plinq-control-search').addEventListener('input', (evt) => {
    for (const ct of contacts) {
      const include = `${ct.firstName} ${ct.lastName}`.toLowerCase().includes(evt.target.value.toLowerCase());
      document.getElementById(`plinq-user-block-${ct.publicIdentifier}`).style.display = include ? 'flex' : 'none';
    }
  });
  for (const elem of Array.from(document.getElementsByClassName('plinq-control-toggle-user')))
    elem.addEventListener('click', async (evt) => {
      try {
        const id = evt.target.getAttribute('data-user');
        if (id != null) {
          const details = mapById[id];
          details.contactInfo = await api.fetchContactInfo(id);
          await storage.upsert([details]);
          evt.target.disabled = true;
          evt.target.innerText = 'Done!';
        }
      } catch (e) {
        console.error(e);
        alert(e);
      }
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
    return await this.#fetchWithCsrf('https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionList-15&count=1000&q=search&sortType=FIRSTNAME_LASTNAME&start=0');
  }

  async fetchContactInfo(userId) {
    return await this.#fetchWithCsrf(`https://www.linkedin.com/voyager/api/identity/profiles/${userId}/profileContactInfo`);
  }
}

async function fetchContacts() {
  try {
    const csrf = decodeURIComponent(document.cookie).split('; ').filter(it => it.startsWith('JSESSIONID'))[0].split('"')[1];
    console.log(csrf);
    if (csrf !== undefined) {
      api = new LinkedInApi(csrf);
      const conns = await api.fetchAllConnections();
      console.log(conns);
      // type: {elements: {connectedMemberResolutionResult: {lastName, firstName, profilePicture: {}, publicIdentifier}}}
      for (const conn of conns.elements) {
        console.info(conn);
      }
      injectSidebar(conns.elements.map(s => s.connectedMemberResolutionResult));
    }
  } catch (e) {
    console.error('Plinq importer: unable to read CSRF token from cookies', e);
  }
}

chrome.runtime.sendMessage({module: 'liImport', topic: 'enabled?'}, response => {
  if (response.value) {
    fetchContacts();
  }
});