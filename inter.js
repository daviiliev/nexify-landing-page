// ============================================
// 1. MOBILE MENU
// ============================================
const toggleBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Icon wechseln
        const icon = toggleBtn.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Menü schließen wenn Link geklickt
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
}

// ============================================
// 2. NAVIGATION SCHATTEN BEIM SCROLLEN
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ============================================
// 3. FAQ TOGGLE
// ============================================
function toggleFaq(el) {
    const answer = el.parentElement.querySelector('.faq-answer');
    const icon = el.querySelector('i');
    
    if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Alle anderen FAQ schließen (optional)
        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) {
                a.classList.remove('open');
                a.parentElement.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            }
        });
        
        answer.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
    }
}

// ============================================
// 4. SCROLL ANIMATIONEN (REVEAL)
// ============================================
const revealElements = document.querySelectorAll('.reveal');

function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 80 && rect.bottom > 40;
}

function handleReveal() {
    revealElements.forEach(el => {
        if (isInView(el)) {
            el.classList.add('visible');
        }
    });
}

// ============================================
// 5. STATISTIK COUNTER
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    
    if (isInView(statsSection) && !countersStarted) {
        countersStarted = true;
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.count);
            const isFloat = target % 1 !== 0;
            let current = 0;
            const duration = 2000; // 2 Sekunden
            const steps = 60;
            const increment = target / steps;
            let step = 0;
            
            const timer = setInterval(() => {
                step++;
                current += increment;
                if (step >= steps) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
            }, duration / steps);
        });
    }
}

// ============================================
// 6. SMOOTH SCROLL (für alle Anker-Links)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // URL aktualisieren ohne zu springen
            history.pushState(null, null, href);
        }
    });
});

// ============================================
// 7. EVENT LISTENER
// ============================================
window.addEventListener('scroll', () => {
    handleReveal();
    animateCounters();
});

window.addEventListener('load', () => {
    // Hero sofort sichtbar machen
    document.querySelector('.hero')?.classList.add('visible');
    
    // Erste FAQ öffnen (für bessere UX)
    const firstFaq = document.querySelector('.faq-item .faq-answer');
    if (firstFaq) {
        firstFaq.classList.add('open');
        const icon = firstFaq.parentElement.querySelector('.faq-question i');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
    
    // Counter prüfen (falls Stats schon sichtbar)
    setTimeout(animateCounters, 500);
});

// ============================================
// 8. ZUSATZ: KONSOLE WILLKOMMEN
// ============================================
console.log('%c🚀 Nexify Landing Page', 'font-size: 24px; font-weight: bold; color: #1a6aff;');
console.log('%cPremium Portfolio Projekt mit Vanilla JS', 'font-size: 14px; color: #3f5a7f;');
console.log('%c💡 Tipp: Schau dir den Code an – clean, modular, semantisch!', 'font-size: 12px; color: #0e4fd0;');