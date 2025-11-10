// ============================================
// VALUES ACCORDION
// ============================================
const valuesItems = document.querySelectorAll('.values__item');
const valuesImage = document.querySelector('.values__image');
const defaultImageSrc = 'assets/images/values-image.png';

// Helper function to scroll element to center
function scrollToCenter(element) {
    setTimeout(() => {
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.top + window.pageYOffset - (window.innerHeight / 2) + (elementRect.height / 2);
        
        window.scrollTo({
            top: elementCenter,
            behavior: 'smooth'
        });
    }, 300); // Small delay to allow accordion animation to start
}

valuesItems.forEach(item => {
    item.querySelector('.values__item-header').addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');
        
        if (isExpanded) {
            // Close the currently expanded item
            item.classList.remove('expanded');
            
            // Reset to default image when all items are closed
            if (valuesImage) {
                valuesImage.src = defaultImageSrc;
            }
        } else {
            // Close all other items
            valuesItems.forEach(otherItem => {
                otherItem.classList.remove('expanded');
            });
            
            // Open the clicked item
            item.classList.add('expanded');
            
            // Update image based on selected item
            const newImageSrc = item.getAttribute('data-value-image');
            if (newImageSrc && valuesImage) {
                valuesImage.src = newImageSrc;
            }
            
            // Scroll to center when expanding
            scrollToCenter(item);
        }
    });
});