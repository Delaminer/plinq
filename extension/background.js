let baseData = {
    contacts: [],
};

// Initialize the database for a new user

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'plinq': baseData });
  console.log('Initialized Plinq database!');
});