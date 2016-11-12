/* global chrome*/

/* ########################################################################## */
/* ########################### Core functionality  ########################## */
/* ########################################################################## */

/**
 * Send requests to our backend
 * @param  {String} selectedText
 * @return {void}
 */
function sendServiceRequest(selectedText) {
  const query = encodeURIComponent(selectedText);
  const serviceCall = chrome.extension.getURL(`../results.html?q=${query}`);

  chrome.tabs.create({url: serviceCall});
}

const query = {active: true, currentWindow: true};

chrome.tabs.query(query, tabs => {
  const currentTab = tabs[0];
  chrome.tabs.sendRequest(currentTab.id, {message: 'getSelection'}, response => {
    const hadith = response.data.trim();

    // If user selected nothing from the page.
    if (!hadith) {
      return;
    }

    sendServiceRequest(response.data);
  });
});
