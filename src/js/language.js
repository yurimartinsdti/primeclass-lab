// ============================================
// LANGUAGE MANAGER
// ============================================
class LanguageManager {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Detect browser language first
        const browserLang = navigator.language || navigator.userLanguage;
        
        // If browser language is Turkish (tr or tr-TR), use Turkish
        if (browserLang.toLowerCase().startsWith('tr')) {
            return 'tr';
        }

        // Default to English for all other languages
        return 'en';
    }

    init() {
        // Apply initial language
        this.applyTranslations();
        this.updateLanguageSwitcher();
        this.updateDocumentLinks();

        // Add event listener to language switcher
        const langSwitcher = document.getElementById('langSwitcher');
        if (langSwitcher) {
            langSwitcher.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'tr' : 'en';
        // Removed localStorage saving - always detect from browser
        this.applyTranslations();
        this.updateLanguageSwitcher();
        this.updateDocumentLinks();
        
        // Update HTML lang attribute
        const htmlRoot = document.getElementById('html-root') || document.documentElement;
        htmlRoot.lang = this.currentLang;
    }

    updateLanguageSwitcher() {
        const langText = document.getElementById('langSwitcherText');
        if (langText) {
            langText.textContent = this.currentLang === 'en' ? 'EN' : 'TR';
        }
    }

    updateDocumentLinks() {
        const langCode = this.currentLang === 'en' ? 'EN' : 'TR';
        
        const privacyLink = document.getElementById('privacyPolicyLink');
        const cookieLink = document.getElementById('cookiePolicyLink');
        const dataFormLink = document.getElementById('dataSubjectFormLink');
        
        if (privacyLink) {
            privacyLink.href = `assets/docs/privacy-policy-${langCode}.pdf`;
            privacyLink.download = `privacy-policy-${langCode}.pdf`;
        }
        
        if (cookieLink) {
            cookieLink.href = `assets/docs/cookie-policy-${langCode}.pdf`;
            cookieLink.download = `cookie-policy-${langCode}.pdf`;
        }
        
        if (dataFormLink) {
            dataFormLink.href = `assets/docs/data-subject-application-form-${langCode}.pdf`;
            dataFormLink.download = `data-subject-application-form-${langCode}.pdf`;
        }

        // Update story links based on language
        this.updateStoryLinks();
    }

    updateStoryLinks() {
        const storyLinks = document.querySelectorAll('[data-story-link]');
        
        storyLinks.forEach(link => {
            const cardKey = link.getAttribute('data-story-link');
            
            if (cardKey && translations[this.currentLang]?.stories?.[cardKey]?.url) {
                const url = translations[this.currentLang].stories[cardKey].url;
                link.href = url;
            }
        });
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return null;
            }
        }
        
        return translation;
    }
}