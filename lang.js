// ── SHARED LANGUAGE UTILITY ──
// Saves and loads language preference across pages using localStorage

function applyLang(lang, translations, htmlOverrides) {
    localStorage.setItem('kbfs-lang', lang);

    document.getElementById('currentLang').textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${lang}'`)) btn.classList.add('active');
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (htmlOverrides && htmlOverrides[key] && htmlOverrides[key][lang]) {
            el.innerHTML = htmlOverrides[key][lang];
        } else if (translations[lang]?.[key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
    });
}

function getSavedLang() {
    return localStorage.getItem('kbfs-lang') || 'en';
}
