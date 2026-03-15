
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});


document.addEventListener('mouseover', (e) => {
    if (cursor && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.btn') || e.target.closest('.nav-link'))) {
        cursor.classList.add('hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (cursor && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.btn') || e.target.closest('.nav-link'))) {
        cursor.classList.remove('hover');
    }
});


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


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


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


const revealElements = document.querySelectorAll('.reveal, .skill-card, .project-card, .certificate-card, .notice-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};


document.addEventListener('DOMContentLoaded', () => {
    
    const elementsToReveal = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .notice-card, .glass-card');
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
    
    
    initParticleEffects();
    
    
    initTiltEffects();
    
    
    initBackgroundElements();
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.floating-particles');
    
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (particles) {
        const particleRate = scrolled * -0.1;
        particles.style.transform = `translateY(${particleRate}px)`;
    }
});


function initParticleEffects() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        
        const randomDelay = Math.random() * 6;
        const randomDuration = 4 + Math.random() * 4;
        
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
        
        
        particle.addEventListener('mouseenter', () => {
            particle.style.transform = 'scale(2)';
            particle.style.opacity = '1';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0.6';
        });
    });
}

function initBackgroundElements() {
    const bgElements = document.querySelectorAll('.bg-element');
    const imageDecorations = document.querySelectorAll('.image-decoration');
    
    
    bgElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.opacity = '0.3';
            element.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.opacity = '0.1';
            element.style.transform = 'scale(1)';
        });
    });
    
    
    imageDecorations.forEach(decoration => {
        decoration.addEventListener('mouseenter', () => {
            decoration.style.opacity = '1';
            decoration.style.transform = 'scale(1.5)';
        });
        
        decoration.addEventListener('mouseleave', () => {
            decoration.style.opacity = '0.6';
            decoration.style.transform = 'scale(1)';
        });
    });
    
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bgElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}


function initTiltEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .notice-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    try {
        
        const formData = new FormData(contactForm);
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            contactForm.reset();
            
            
            const labels = contactForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = 'var(--font-size-base)';
                label.style.color = 'var(--text-light)';
            });
            
    
            setTimeout(() => {
                createConfetti();
            }, 500);
            
        } else {
            throw new Error('Erro no envio');
        }
        
    } catch (error) {
        console.error('Erro no envio:', error);
        showNotification('Erro ao enviar mensagem. Entre em contato diretamente pelo e-mail: zzzgams@gmail.com', 'error');
    } finally {
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : type === 'error' ? 'linear-gradient(45deg, #f44336, #d32f2f)' : 'linear-gradient(45deg, #2196F3, #1976D2)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(400px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 5000);
}


const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    if (input && label) {
        
        if (input.value) {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.75rem';
            label.style.color = 'var(--primary-color)';
            label.style.fontWeight = '600';
        }
        
        input.addEventListener('focus', () => {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.75rem';
            label.style.color = 'var(--primary-color)';
            label.style.fontWeight = '600';
            group.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '1rem';
                label.style.fontSize = 'var(--font-size-sm)';
                label.style.color = 'var(--text-light)';
                label.style.fontWeight = '400';
            }
            group.style.transform = 'scale(1)';
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.75rem';
                label.style.color = 'var(--primary-color)';
                label.style.fontWeight = '600';
            }
        });
    }
});


const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .notice-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
    
        card.style.boxShadow = '0 20px 50px rgba(255, 143, 163, 0.3)';
        
        
        createHoverParticles(card);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

function createHoverParticles(card) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
        `;
        
        const rect = card.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        card.appendChild(particle);
        
        
        setTimeout(() => {
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            particle.style.opacity = '0';
            particle.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 600);
        }, 100);
    }
}


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}


function createConfetti() {
    const colors = ['#ff8fa3', '#f4a6cd', '#ffb3d1', '#b8e6b8', '#b8d4e6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * window.innerWidth}px;
            z-index: 10000;
            pointer-events: none;
            border-radius: 2px;
        `;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            document.body.removeChild(confetti);
        };
    }
}


function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.3s ease;
        box-shadow: 0 2px 10px rgba(255, 143, 163, 0.3);
        border-radius: 0 2px 2px 0;
    `;
    
    document.body.appendChild(progressBar);
    
    
    const scrollIndicator = document.querySelector('.custom-scroll-indicator');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        
        progressBar.style.width = scrollPercent + '%';
        
       
        if (scrollIndicator) {
            scrollIndicator.style.setProperty('--scroll-percent', scrollPercent + '%');
            scrollIndicator.style.setProperty('--scroll-height', scrollPercent + '%');
        }
        
        
        if (scrollPercent > 0) {
            progressBar.style.boxShadow = '0 2px 15px rgba(255, 143, 163, 0.5)';
        } else {
            progressBar.style.boxShadow = '0 2px 10px rgba(255, 143, 163, 0.3)';
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
    
    
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});


function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


window.addEventListener('scroll', throttle(() => {
    revealOnScroll();
}, 16));


document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});


window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}); 
