// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Trigger animation
    themeToggle.style.animation = 'none';
    setTimeout(() => {
        themeToggle.style.animation = '';
    }, 10);
});

// Toggle cattle details with smooth animation
function toggleCattleDetails(button) {
    const row = button.closest('tr');
    const detailsRow = row.nextElementSibling;
    
    if (detailsRow && detailsRow.classList.contains('cattle-row-details')) {
        const isActive = detailsRow.classList.contains('active');
        
        if (!isActive) {
            detailsRow.classList.add('active');
            button.textContent = 'Hide';
            button.style.animation = 'pulse 0.5s ease';
        } else {
            detailsRow.classList.remove('active');
            button.textContent = 'View';
        }
    }
}

// Add smooth scroll behavior
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .alerts-section, .cattle-section, .geofence-section').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Real-time sensor data update simulation
function updateSensorData() {
    const dataValues = document.querySelectorAll('.data-value');
    dataValues.forEach(element => {
        if (element.textContent.includes('°C')) {
            const baseTemp = 24.5;
            const variation = (Math.random() - 0.5) * 1;
            element.textContent = (baseTemp + variation).toFixed(1) + '°C';
        } else if (element.textContent.includes('L')) {
            const baseLevel = 1250;
            const variation = Math.floor((Math.random() - 0.5) * 50);
            element.textContent = (baseLevel + variation) + 'L';
        }
    });
}

// Update sensor data every 5 seconds
setInterval(updateSensorData, 5000);

// Add interactive feedback to alert items
document.querySelectorAll('.alert-item').forEach(alert => {
    alert.addEventListener('click', function () {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Keyboard accessibility for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Add touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right
    }
}

// Console welcome message
console.log('%c🐄 Dairy Farm Monitoring System', 'font-size: 20px; color: #8b7355; font-weight: bold;');
console.log('%cWelcome! This system monitors cattle health, sensors, and farm operations in real-time.', 'font-size: 14px; color: #6b6359;');
