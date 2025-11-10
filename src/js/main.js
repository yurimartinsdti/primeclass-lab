// ============================================
// PRIMECLASS MAIN JAVASCRIPT
// ============================================

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language manager
    window.languageManager = new LanguageManager();
    
    // Initialize carousel if it exists
    if (document.getElementById('storiesCarousel')) {
        initializeCarousel();
    }
});

// ============================================
// FEATURED STORIES CAROUSEL
// ============================================
function initializeCarousel() {
    const carousel = document.getElementById('storiesCarousel');
    const prevButton = document.getElementById('storiesPrev');
    const nextButton = document.getElementById('storiesNext');
    const progress = document.getElementById('storiesProgress');
    
    function updateProgress() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const scrollPercentage = (carousel.scrollLeft / maxScroll) * 100;
        progress.style.width = scrollPercentage + '%';
    }
    
    function scrollCarousel(direction) {
        const cardWidth = 328 + 16; // card width + gap
        const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
        
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    if (prevButton) prevButton.addEventListener('click', () => scrollCarousel('prev'));
    if (nextButton) nextButton.addEventListener('click', () => scrollCarousel('next'));
    
    if (carousel) {
        carousel.addEventListener('scroll', updateProgress);
        
        // Touch support for carousel
        let touchStartX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                scrollCarousel(diff > 0 ? 'next' : 'prev');
            }
        });
        
        // Initialize progress
        updateProgress();
    }
}