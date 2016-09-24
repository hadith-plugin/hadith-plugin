/* global chrome*/
'use strict';
// console.log('\'Allo \'Allo! Event Page for Browser Action');

/* ########################################################################## */
/* ###################### General / Initial actions ######################### */
/* ########################################################################## */
chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: 'حديث'});

/* ########################################################################## */
/* ########################### Core functionality  ########################## */
/* ########################################################################## */
