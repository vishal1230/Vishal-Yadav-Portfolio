// Enhanced JavaScript with Email Integration
(function() {
    'use strict';

    // Initialize EmailJS
    emailjs.init("Qg7MBClEGnJUi1EyO"); // Replace with your EmailJS user ID

    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const backToTop = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');

    // Mobile Navigation
    function initMobileNav() {
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu?.contains(e.target) && !hamburger?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Smooth Scrolling
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Navigation Links
    function initActiveNav() {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Navbar Scroll Effect
    function initNavbarScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
    }

    // Dynamic Typing Effect
    function initTypingEffect() {
        const dynamicText = document.getElementById('dynamic-text');
        if (!dynamicText) return;

        const texts = [
            'Software Engineer',
            'Python & React Developer',
            'GenAI / LLM App Builder',
            'Problem Solver'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = typingSpeed;
            }

            setTimeout(typeText, speed);
        }

        typeText();
    }

    // Animated Counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const increment = target / 50;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 40);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Intersection Observer for Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .skill-category, 
            .project-card, 
            .timeline-item,
            .highlight-item,
            .about-card,
            .contact-card
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }

    // Enhanced Contact Form with Email Functionality
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const formData = new FormData(this);
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            hideFormStatus();

            try {
                // Prepare email data
                const templateParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    to_name: 'Vishal Yadav',
                    reply_to: formData.get('email')
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_v2p4w2k',     // Replace with your EmailJS service ID
                    'template_jpo1zns',    // Replace with your EmailJS template ID
                    templateParams
                );

                if (response.status === 200) {
                    showFormStatus('success', `Thank you, ${formData.get('name')}! Your message has been sent successfully. I'll get back to you soon.`);
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send email');
                }

            } catch (error) {
                console.error('Email send error:', error);
                showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or contact me directly at vishal04032003@gmail.com.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearFieldError(e);
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = 'var(--danger-color)';
        
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: var(--danger-color);
                font-size: 0.8rem;
                margin-top: 0.25rem;
                font-weight: 500;
            `;
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearFieldError(e) {
        const field = e.target;
        field.style.borderColor = 'var(--gray-200)';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            ${message}
        `;
        formStatus.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(hideFormStatus, 5000);
        }
    }

    function hideFormStatus() {
        if (formStatus) {
            formStatus.style.display = 'none';
        }
    }

    // Back to Top Button
    function initBackToTop() {
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Skill Category Hover Effects
    function initSkillEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                const tags = category.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-3px) scale(1.05)';
                        setTimeout(() => {
                            tag.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }, index * 50);
                });
            });
        });
    }

    // Scroll Progress Indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Lazy Loading for Images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s';
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                imageObserver.observe(img);
            });
        }
    }

        // Theme Detection and Customization
    function initThemeDetection() {
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = e => {
            if (e.matches) {
                document.documentElement.classList.add('dark-theme');
            } else {
                document.documentElement.classList.remove('dark-theme');
            }
        };
        // Initial check
        applyTheme(darkMediaQuery);
        // Listen for changes
        darkMediaQuery.addEventListener('change', applyTheme);
    }

    // Initialize everything once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initMobileNav();
        initSmoothScroll();
        initActiveNav();
        initNavbarScroll();
        initTypingEffect();
        initCounters();
        initScrollAnimations();
        initContactForm();
        initBackToTop();
        initSkillEffects();
        initScrollProgress();
        initLazyLoading();
        initThemeDetection();
    });
})();
