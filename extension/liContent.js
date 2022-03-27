console.info('%cContent script loaded', 'color:blue');

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

async function fetchContacts() {
  try {
    const csrf = decodeURIComponent(document.cookie).split('; ').filter(it => it.startsWith('JSESSIONID'))[0].split('"')[1];
    console.log(csrf);
    if (csrf !== undefined) {
      const api = new LinkedInApi(csrf);
      const conns = await api.fetchAllConnections();
      console.log(conns);
      // type: {elements: {connectedMemberResolutionResult: {lastName, firstName, publicIdentifier}}}
      for (const conn of conns.elements) {
        console.info(conn);
      }
    }
  } catch (e) {
    console.error('Plinq importer: unable to read CSRF token from cookies', e);
  }
}

fetchContacts();