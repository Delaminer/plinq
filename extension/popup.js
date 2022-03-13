
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
      function: handleLinkedInPage,
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
const handleLinkedInPage = () => {
   const links = Array.from(document.querySelectorAll('.mn-connection-card__link'));
   const entries = links.map(link => ({
       name: link.querySelector('.mn-connection-card__name').innerText,
       occupation: link.querySelector('.mn-connection-card__occupation').innerText,
       link: link.href
   })).slice(0, 3);
   // entries = entries.slice(0, 3);
   console.log(entries); // debug
   
   // Go to each page
   entries.forEach((entry, i) => {
      let windowRef = window.open(entry.link, '_blank');
      setTimeout(() => {
         alert(windowRef.document.querySelector('#top-card-text-details-contact-info').textContent)
      }, 2000)
      // This page has
      // https://www.linkedin.com/in/simarpreet-singh-84a599190/overlay/contact-info/
   });
}