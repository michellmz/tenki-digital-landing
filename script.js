document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // 1. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Fix for visibility issue)
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.2, 
        rootMargin: '0px 0px -50px 0px' 
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 4. Stats Counter Script
    const statItems = document.querySelectorAll('.stat-item');

    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const targetElement = entry.target.querySelector('.stat-number');
                let targetValue = parseInt(targetElement.getAttribute('data-target'));
                let isPercentage = targetElement.textContent.includes('%');
                let isPlus = targetElement.textContent.includes('+');
                
                targetElement.textContent = '0'; 
                
                let start = 0;
                const duration = 2000; 
                let startTime = null;

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    const percentage = Math.min(progress / duration, 1);
                    
                    let currentValue = Math.floor(percentage * targetValue);
                    let displayValue = currentValue.toString();
                    
                    if (isPercentage) {
                        displayValue += '%';
                    }
                    if (isPlus && percentage === 1) {
                        displayValue += '+';
                    }

                    targetElement.textContent = displayValue;

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        entry.target.classList.add('counted'); 
                    }
                };

                window.requestAnimationFrame(step);
            }
        });
    }, { threshold: 0.5 }); 

    statItems.forEach(item => {
        countUpObserver.observe(item);
    });
    
    // 5. Set current year in the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
