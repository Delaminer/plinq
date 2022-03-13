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