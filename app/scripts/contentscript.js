/* global chrome*/

/* ########################################################################## */
/* ########################### Core functionality  ########################## */
/* ########################################################################## */

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
  if (request.message === 'getSelection') {
    sendResponse({data: window.getSelection().toString()});
  }
});
