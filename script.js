// ===== DOM Elements =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('.content-section');

// ===== Sidebar Toggle Functionality =====
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== Smooth Scrolling & Active Link Highlighting =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close sidebar on mobile
            if (window.innerWidth <= 968) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// ===== Intersection Observer for Active Section =====
const observerOptions = {
    root: null,
    rootMargin: '-150px 0px -40% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== Image Protection =====
const imageContainers = document.querySelectorAll('.image-container');

// Prevent right-click on images
imageContainers.forEach(container => {
    container.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionWarning(container);
        return false;
    });
});

// Prevent drag-and-drop
imageContainers.forEach(container => {
    const img = container.querySelector('.protected-image');
    
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        showProtectionWarning(container);
        return false;
    });
    
    img.addEventListener('mousedown', (e) => {
        if (e.button === 2) { // Right click
            e.preventDefault();
            showProtectionWarning(container);
        }
    });
});

// Show protection warning
function showProtectionWarning(container) {
    container.classList.add('show-protection');
    setTimeout(() => {
        container.classList.remove('show-protection');
    }, 1500);
}

// Prevent keyboard shortcuts for saving images
document.addEventListener('keydown', (e) => {
    // Prevent Ctrl+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showGlobalProtectionWarning();
    }
    
    // Prevent Ctrl+Shift+S (Save As)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        showGlobalProtectionWarning();
    }
    
    // Prevent Print Screen attempts on images (informational only)
    if (e.key === 'PrintScreen') {
        showGlobalProtectionWarning();
    }
});

function showGlobalProtectionWarning() {
    // Create temporary warning message
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #dd0031 0%, #c3002f 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
    `;
    warning.innerHTML = '🔒 Images are protected from downloading';
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(warning);
        }, 300);
    }, 2000);
}

// ===== Disable Developer Tools Shortcuts (Informational) =====
// Note: This doesn't fully prevent screenshots, but adds awareness
document.addEventListener('keydown', (e) => {
    // Prevent F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    
    // Prevent Ctrl+Shift+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    
    // Prevent Ctrl+Shift+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
    }
    
    // Prevent Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
    }
});

// ===== Additional Image Protection via CSS =====
// Apply additional protection styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    /* Prevent selection of images and text in image containers */
    .image-container * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Additional drag protection */
    img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    
    /* Watermark overlay for extra protection */
    .image-container::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 5;
    }
`;
document.head.appendChild(style);

// ===== Back to Top Button =====
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #dd0031 0%, #c3002f 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

createBackToTopButton();

// ===== Search Functionality (Optional Enhancement) =====
const addSearchFunctionality = () => {
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        padding: 1rem 1.5rem;
        border-bottom: 2px solid var(--border-color);
        margin-bottom: 1rem;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search topics...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = 'var(--primary-color)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = 'var(--border-color)';
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const listItem = link.parentElement;
            
            if (text.includes(searchTerm)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    });
    
    searchContainer.appendChild(searchInput);
    
    const sidebarHeader = document.querySelector('.sidebar-header');
    sidebarHeader.after(searchContainer);
};

addSearchFunctionality();

// ===== Progress Bar =====
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #dd0031 0%, #0066ff 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createProgressBar();

// ===== Console Warning =====
console.log(
    '%c⚠️ Warning: Image Protection Active',
    'color: #dd0031; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cImages on this site are protected. Please respect the content creator\'s rights.',
    'color: #666; font-size: 14px;'
);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🅰️ Angular Visual Storybook loaded successfully!');
    
    // Set first link as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===== Prevent Browser Context Menu on Long Press (Mobile) =====
let pressTimer;
imageContainers.forEach(container => {
    const img = container.querySelector('.protected-image');
    
    img.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            showProtectionWarning(container);
        }, 500);
    });
    
    img.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });
    
    img.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
    });
});

// ===== Performance Monitoring =====
if ('performance' in window && 'PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn(`Slow operation detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // PerformanceObserver not supported in this browser
    }
}

// ===== Accessibility Enhancements =====
// Ensure keyboard navigation works properly
document.addEventListener('keydown', (e) => {
    // Close sidebar with Escape key
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add skip to content link for screen readers
const skipLink = document.createElement('a');
skipLink.href = '#content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'sr-only';
skipLink.style.cssText = `
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10002;
        padding: 1rem;
        background: white;
        width: auto;
        height: auto;
    `;
});
skipLink.addEventListener('blur', () => {
    skipLink.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
});
document.body.insertBefore(skipLink, document.body.firstChild);
