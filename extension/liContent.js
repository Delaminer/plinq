console.info('%cContent script loaded', 'color:blue');

function extractProfilePictureUrl(contact) {
  // our desired image size is 100
  try {
    const imgRoot = contact.profilePicture.displayImageReference.vectorImage;
    return imgRoot.rootUrl + imgRoot.artifacts.filter(i => i.width === 100)[0].fileIdentifyingUrlPathSegment;
  } catch (e) {
    console.warn('warning: failed to load profile picture for ', contact);
    return null;
    return ;
  }
}

function sidebarHtml(contacts) {
  console.log(contacts);
  const body = `
    <h1 class="t-24 t-black t-normal">Add from LinkedIn</h1>
    <div>
      <input class="artdeco-text-input--search artdeco-text-input--input" placeholder="Search by name..." type="search" id="plinq-control-search">
    </div>
    <button class="artdeco-button" style="margin:20px;" id="plinq-control-select-all">Select All</button>
    <button class="artdeco-button artdeco-button--secondary" style="margin:20px;" id="plinq-control-unselect-all">Unselect All</button>
    <div>` + contacts.filter(it => it != undefined).map(ct => `<div style="display: flex; align-items:center;background-color:#dadada; border-radius: 8px; margin: 4px; padding: 8px;">
      <img style="width:50px;border-radius:25px;" class="${extractProfilePictureUrl(ct) == null ? 'ghost-person' : ''}" src="${extractProfilePictureUrl(ct) || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}" alt="profile picture for ${ct.firstName} ${ct.lastName}">
      <div style="margin-left:8px">
        <p class="t-16 t-normal t-bold">${ct.firstName} ${ct.lastName}</p>
      </div>
      <div style="margin-left: auto;display:flex;align-items:center;">
        <button class="artdeco-button" class="plinq-control-toggle-user" data-user="${ct.publicIdentifier}">Add</button>
      </div>
    </div>`).join('') + `</div>`;
  return `
  <aside style="position:fixed;top:20px;right:20px;bottom:20px;border-radius:1rem;background:#eee;border:2px solid #999;box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);padding:12px;z-index:10000000;overflow:scroll" id="plinq-importer">
    ${body}
  </aside>`;
}

function injectSidebar(contacts) {
  const html = sidebarHtml(contacts);
  const parser = new DOMParser();
  const elem = parser.parseFromString(html, 'text/html');
  document.body.appendChild(elem.body.children[0]);
  const checkboxes = Array.from(document.getElementsByClassName('plinq-user-selector'));
  document.getElementById('plinq-control-select-all').addEventListener('click', () => {
    for (const checkbox of checkboxes) {
      checkbox.checked = true;
    }
  });
  document.getElementById('plinq-control-unselect-all').addEventListener('click', () => {
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
  });
  document.getElementById('plinq-control-search').addEventListener('input', (evt) => {
    evt.value
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
      const api = new LinkedInApi(csrf);
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