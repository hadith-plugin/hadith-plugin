/* global chrome*/
'use strict';

console.log('\'Allo \'Allo! Popup');

/* ########################################################################## */
/* ########################### Core functionality  ########################## */
/* ########################################################################## */

/**
 * Send requests to our backend
 * @param  {String} selectedText
 * @return {void}
 */
function sendServiceRequest(selectedText) {
  const serviceCall = 'http://www.islamweb.net/mainpage/newsearch.php?page=result&q=' + selectedText;
  chrome.tabs.create({url: encodeURI(serviceCall)});
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
