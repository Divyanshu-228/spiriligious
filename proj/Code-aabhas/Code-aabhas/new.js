// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the scroller element
    const scroller = document.querySelector('.scroller');
    
    // If the scroller exists, proceed
    if (scroller) {
        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        // Duplicate the items to create the infinite effect
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            // Add an attribute to distinguish duplicated items (optional, but good practice)
            duplicatedItem.setAttribute('aria-hidden', true); 
            scrollerInner.appendChild(duplicatedItem);
        });

        let scrollPosition = 0;
        let isPaused = false;
        
        // Define the animation speed (lower number is faster)
        const scrollSpeed = 0.5; 

        // The animation loop function
        function animate() {
            // If the animation is not paused
            if (!isPaused) {
                // Increment the scroll position
                scrollPosition += scrollSpeed;
                
                // If the scroll position has moved past the original content width, reset it
                if (scrollPosition >= scrollerInner.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                
                // Apply the transform to move the content
                scrollerInner.style.transform = `translateX(-${scrollPosition}px)`;
            }
            
            // Request the next animation frame to create a smooth loop
            requestAnimationFrame(animate);
        }

        // Pause animation on hover
        scroller.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        // Resume animation when the mouse leaves
        scroller.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Start the animation
        animate();
    }
});