// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature items, cards, and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.component-card, .feature-item, .manufacturer, .info-box, .workflow-step'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effect to component cards
document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Search functionality (if needed)
function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search components...">
        <button id="search-btn">Search</button>
    `;
    
    const nav = document.querySelector('.nav-container');
    if (nav) {
        nav.appendChild(searchContainer);
    }
    
    // Add search styles
    const searchStyles = `
        .search-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .search-container input {
            padding: 0.5rem;
            border: none;
            border-radius: 5px;
            background: rgba(255,255,255,0.2);
            color: white;
            placeholder-color: rgba(255,255,255,0.7);
        }
        
        .search-container input::placeholder {
            color: rgba(255,255,255,0.7);
        }
        
        .search-container button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            background: rgba(255,255,255,0.3);
            color: white;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .search-container button:hover {
            background: rgba(255,255,255,0.4);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);
}

// Component comparison tool
function createComparisonTool() {
    const comparisonData = {
        cpu: {
            name: 'CPU',
            specs: ['Cores', 'Threads', 'Clock Speed', 'Cache', 'TDP'],
            examples: [
                { name: 'Intel i5-13600K', cores: 14, threads: 20, clock: '5.1GHz', cache: '24MB', tdp: '125W' },
                { name: 'AMD Ryzen 5 7600X', cores: 6, threads: 12, clock: '5.3GHz', cache: '38MB', tdp: '105W' }
            ]
        },
        gpu: {
            name: 'GPU',
            specs: ['VRAM', 'Clock Speed', 'CUDA Cores', 'TDP', 'Memory Speed'],
            examples: [
                { name: 'NVIDIA RTX 4060', vram: '8GB', clock: '2.4GHz', cuda: '3072', tdp: '115W', memory: '17Gbps' },
                { name: 'AMD RX 7600', vram: '8GB', clock: '2.7GHz', cuda: '2048', tdp: '165W', memory: '18Gbps' }
            ]
        }
    };
    
    // This could be expanded to create an interactive comparison table
    console.log('Comparison data loaded:', comparisonData);
}

// Theme toggle (dark/light mode)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = 'Toggle Theme';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            // Dark theme styles
            document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#e0e0e0');
            document.documentElement.style.setProperty('--card-bg', '#2a2a2a');
        } else {
            // Light theme styles
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
        }
    });
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment to enable features
    // createSearchBox();
    // createComparisonTool();
    // createThemeToggle();
    
    console.log('Computer Components Website loaded successfully!');
});

// Performance optimization - lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive navigation handling
const handleResize = debounce(() => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Print-friendly styles
window.addEventListener('beforeprint', () => {
    document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-mode');
});

// Analytics placeholder (for future implementation)
function trackPageView(pageName) {
    console.log(`Page view: ${pageName}`);
    // This would integrate with Google Analytics or similar service
}

// Track page views
trackPageView(window.location.pathname.split('/').pop() || 'home');
