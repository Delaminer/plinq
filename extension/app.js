// Get data
let output = document.querySelector('#data-output');

function loadData() {
  chrome.storage.sync.get('plinq', ({'plinq': data}) => {
    output.textContent = JSON.stringify(data);
  });
}
output.textContent = 'No data.';

loadData();
document.querySelector('#load-data').addEventListener('click', loadData);

// Button to display the add contact form
const addContactsButton = document.querySelector('#add-contact')
const addContactForm = document.querySelector('#add-contact')
addContactsButton.addEventListener('click', () => {
  // Enable the form to display, and hide this element
  addContactsButton.style.display = 'none';
})