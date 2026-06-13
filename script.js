document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Smooth scrolling for anchor links (fallback for browsers that don't support scroll-behavior: smooth in CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // WhatsApp Alternating Numbers Logic
    const waNumbers = ["212628835693", "212659524158"];
    // Randomly pick the starting index (0 or 1) so load is balanced across different visitors
    let currentWaIndex = Math.floor(Math.random() * waNumbers.length);

    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extract the original text parameter if it exists
            const url = new URL(this.href);
            const textParam = url.searchParams.get('text');
            
            // Pick the current number and increment the index for the next click
            const targetNumber = waNumbers[currentWaIndex];
            currentWaIndex = (currentWaIndex + 1) % waNumbers.length;
            
            // Construct the new URL
            let newUrl = `https://wa.me/${targetNumber}`;
            if (textParam) {
                newUrl += `?text=${encodeURIComponent(textParam)}`;
            }
            
            // Open WhatsApp in a new tab
            window.open(newUrl, '_blank');
        });
    });
});
