let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});