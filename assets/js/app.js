document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = 80; // Navbar height + padding
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
            navbar.style.padding = '1rem 0';
        }
    });

    // Add hover sound effect to buttons
    const buttons = document.querySelectorAll('.btn-minecraft');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound('hover');
        });
        button.addEventListener('click', () => {
            playSound('click');
        });
    });

    // Play Minecraft-style sounds
    function playSound(type) {
        const audio = new Audio();
        switch(type) {
            case 'hover':
                audio.src = 'assets/sounds/hover.mp3';
                break;
            case 'click':
                audio.src = 'assets/sounds/click.mp3';
                break;
        }
        audio.volume = 0.2;
        audio.play().catch(() => {}); // Ignore errors if sound can't play
    }

    // Promo countdown timer with Minecraft style
    function updateTimer() {
        const now = new Date();
        const end = new Date();
        end.setHours(23, 59, 59);
        
        const diff = end - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timerElements = document.querySelectorAll('.discount-price');
        timerElements.forEach(element => {
            element.setAttribute('data-timer', 
                `⏰ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        });
    }

    // Initialize timer
    setInterval(updateTimer, 1000);
    updateTimer();

    // Add floating animation to product cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('floating');
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Add active class to current nav item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}); 