(() => {
  'use strict';
  const translated = [...document.querySelectorAll('[data-zh]')];
  translated.forEach(element => { element.dataset.en = element.innerHTML; });
  let language = 'en';
  const languageButton = document.getElementById('language');
  function setLanguage(next) {
    language = next;
    const chinese = next === 'zh-Hant';
    document.documentElement.lang = next;
    translated.forEach(element => {
      if (chinese) element.textContent = element.dataset.zh;
      else element.innerHTML = element.dataset.en;
    });
    languageButton.textContent = chinese ? 'English' : '繁體中文';
    languageButton.setAttribute('aria-label', chinese ? 'Switch to English' : 'Switch to Traditional Chinese');
    document.getElementById('nav').setAttribute('aria-label', chinese ? '主要導覽' : 'Main navigation');
    document.title = chinese ? 'Ya-Ting Yang | 生物資訊與機器學習' : 'Ya-Ting Yang | Bioinformatics & Machine Learning';
    document.getElementById('copy-status').textContent = '';
    try { localStorage.setItem('yat-portfolio-language', next); } catch (_) {}
  }
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh-Hant' : 'en'));
  try {
    if (localStorage.getItem('yat-portfolio-language') === 'zh-Hant') setLanguage('zh-Hant');
  } catch (_) {}
  document.getElementById('copy-email').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText('mornicayang@gmail.com');
      status.textContent = language === 'en' ? 'Email address copied.' : '已複製電子郵件地址。';
    } catch (_) {
      status.textContent = language === 'en' ? 'Please select and copy the email address above.' : '請選取上方的電子郵件地址並複製。';
    }
  });
})();
