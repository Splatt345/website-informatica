// Scroll-based navigation bar hiding functionality
let lastScrollTop = 0;
let scrollTimeout;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide navbar when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up or at top
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
    
    // Debounce scroll events
    scrollTimeout = setTimeout(function() {
        // Optional: Add any additional scroll handling here
    }, 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPath === currentPath.split('/').pop() || 
            (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Matrix rain effect for hero section (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    
    const heroSection = document.querySelector('.hero-visual');
    if (heroSection) {
        heroSection.appendChild(canvas);
        
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        const matrix = "01";
        const matrixArray = matrix.split("");
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
    }
}

// Initialize matrix rain effect when page loads
window.addEventListener('load', function() {
    createMatrixRain();
});

// Add typing effect to hero title
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-in-out';
            heroTitle.style.opacity = '1';
        }, 500);
    }
}

// Initialize typing effect
window.addEventListener('load', typeWriter);

// Add hover effect to component cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.component-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax scrolling effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.component-card, .feature-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Add glitch effect to logo on hover
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-text');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
});

// Add glitch animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(style);

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create lightbox HTML structure
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&lsaquo;</button>
            <button class="lightbox-nav lightbox-next">&rsaquo;</button>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-attribution"></div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const galleryImages = Array.from(galleryItems).map(item => ({
        src: item.querySelector('.gallery-image').src,
        alt: item.querySelector('.gallery-image').alt,
        title: item.querySelector('.gallery-overlay h3').textContent,
        description: item.querySelector('.gallery-overlay p').textContent,
        attribution: item.querySelector('.gallery-attribution a')
    }));
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const currentImage = galleryImages[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        
        // Update attribution
        const attributionDiv = lightbox.querySelector('.lightbox-attribution');
        if (currentImage.attribution) {
            attributionDiv.innerHTML = `<a href="${currentImage.attribution.href}" target="_blank" rel="noopener noreferrer" title="${currentImage.attribution.title}">© ${currentImage.attribution.title}</a>`;
            attributionDiv.style.display = 'block';
        } else {
            attributionDiv.style.display = 'none';
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons visibility
        updateNavigationButtons();
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateImage(direction) {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        }
        openLightbox();
    }
    
    function updateNavigationButtons() {
        // Hide navigation buttons if there's only one image
        if (galleryImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateImage('prev'));
    lightboxNext.addEventListener('click', () => navigateImage('next'));
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateImage('prev');
                    break;
                case 'ArrowRight':
                    navigateImage('next');
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateImage('next'); // Swipe left, go to next
            } else {
                navigateImage('prev'); // Swipe right, go to previous
            }
        }
    }
    
    // Add loading animation for images
    lightboxImage.addEventListener('load', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        }, 50);
    });
    
    // Preload next and previous images for smoother navigation
    function preloadImages() {
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        
        const prevImg = new Image();
        const nextImg = new Image();
        
        prevImg.src = galleryImages[prevIndex].src;
        nextImg.src = galleryImages[nextIndex].src;
    }
    
    // Initial preload
    preloadImages();
    
    // Update preload when navigating
    const originalNavigateImage = navigateImage;
    navigateImage = function(direction) {
        originalNavigateImage(direction);
        preloadImages();
    };
});
