'use strict';

(function () {
  var hadithTemplate = null;
  var hadithList = $('.hadith-list');

  function getQueryParam(name, url) {
    if (!url) {
      url = window.location.href;
    }

    var escName = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + escName + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) {
      return;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function showSpinner() {
    $('.spinner-backdrop').css('display', 'table');
    $('.spin').spin('show');
  }

  function hideSpinner() {
    $('.spin').spin('hide');
    $('.spinner-backdrop').css('display', 'none');
  }

  function appendHadith(hadith) {
    var hadithEl = $(hadithTemplate);
    hadithEl.find('.text').text(hadith.content);
    var reference = '';
    if (hadith.index === 'bokhari') {
      reference = 'البخاري';
    }

    hadithEl.find('.reference .desc').text(reference);
    hadithEl.find('.book .desc').text(hadith.book.content);
    hadithEl.find('.chapter .desc').text(hadith.chapter.content);
    hadithEl.find('.judgment .desc').text('صحيح');
    hadithList.append(hadithEl);
  }

  function searchData(query) {
    hadithList.html('');
    hadithList.show();
    $('.searchText').val(query);
    $('.search-text').text(query);
    showSpinner();
    var url = 'https://hadith-search.herokuapp.com/search?q=' + query;
    $.get(url, function (data) {
      if (data.constructor !== Array) {
        return;
      }

      if (data.length === 0) {
        hadithList.text('عفوا لاتوجد أحاديث مطابقة. حاول البحث بكلمات أقل.');
      }
      data.forEach(function (hadith) {
        appendHadith(hadith);
      });

      hideSpinner();
    });
  }

  function searchBtnHandler() {
    var query = $('.searchText').val();
    searchData(query);
    return false;
  }

  function init() {
    hadithList = $('.hadith-list');
    hadithTemplate = hadithList.html();
    var query = getQueryParam('q');
    searchData(query);
    $('.search-form').submit(searchBtnHandler);
  }

  init();
})();