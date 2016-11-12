(function () {
  let hadithTemplate = null;
  let hadithList = $('.hadith-list');

  function getQueryParam(name, url) {
    if (!url) {
      url = window.location.href;
    }

    const escName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + escName + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
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
    const hadithEl = $(hadithTemplate);
    hadithEl.find('.text').text(hadith.content);
    let reference = '';
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
    const url = 'https://hadith-search.herokuapp.com/search?q=' + query;
    $.get(url, data => {
      if (data.constructor !== Array) {
        return;
      }

      if (data.length === 0) {
        hadithList.text('عفوا لاتوجد أحاديث مطابقة. حاول البحث بكلمات أقل.');
      }
      data.forEach(hadith => {
        appendHadith(hadith);
      });

      hideSpinner();
    });
  }

  function searchBtnHandler() {
    const query = $('.searchText').val();
    searchData(query);
    return false;
  }

  function init() {
    hadithList = $('.hadith-list');
    hadithTemplate = hadithList.html();
    const query = getQueryParam('q');
    searchData(query);
    $('.search-form').submit(searchBtnHandler);
  }

  init();
})();
