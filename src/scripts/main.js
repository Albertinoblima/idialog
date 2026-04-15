// ===========================
// DOM Content Loaded
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
});

// ===========================
// Navbar Functionality
// ===========================
function initNavbar() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function () {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Update active nav link based on scroll position
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===========================
// Smooth Scrolling
// ===========================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// Header Scroll Effect
// ===========================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// ===========================
// Contact Form
// ===========================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showFormLoading(true);

                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    showFormLoading(false);
                    showFormSuccess();
                    contactForm.reset();
                }, 2000);
            }
        });
    }
}

function validateForm(data) {
    const errors = [];

    // Validate required fields
    if (!data.name || data.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }

    if (!data.email || data.email.trim() === '') {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(data.email)) {
        errors.push('Email inválido');
    }

    if (!data.subject || data.subject.trim() === '') {
        errors.push('Assunto é obrigatório');
    }

    if (!data.message || data.message.trim() === '') {
        errors.push('Mensagem é obrigatória');
    }

    // Show errors if any
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormLoading(loading) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');

    if (loading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Mensagem';
    }
}

function showFormSuccess() {
    showNotification('Mensagem enviada com sucesso!', 'success');
}

function showFormErrors(errors) {
    const errorMessage = errors.join('<br>');
    showNotification(errorMessage, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .stat, .about-text, .contact-item, .section-header'
    );

    animatedElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });

    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .stat:nth-child(3).animate-in {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }
        
        .service-card:nth-child(5).animate-in {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(6).animate-in {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(animationStyles);
}

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get scroll position
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// Additional Features
// ===========================

// Back to top button (optional)
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (getScrollTop() > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    }, 100));

    // Scroll to top functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addBackToTopButton, 1000);
});

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===========================
// Performance Monitoring
// ===========================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}
