// ============================================
// STICKY NAVIGATION
// ============================================
const header = document.getElementById('header');
const tabNav = document.getElementById('tabNav');
const sections = document.querySelectorAll('section[id]');
const tabItems = document.querySelectorAll('.tab-nav__item');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update active tab based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollTop >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    tabItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll to sections
tabItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - tabNav.offsetHeight - 10;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});