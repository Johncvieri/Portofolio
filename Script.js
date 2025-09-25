// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'var(--primary)';
        navbar.style.padding = '1rem 0';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera.');
    this.reset();
});

// Certificate viewing
function viewCertificate(type) {
    const certificates = {
        'data-science': 'Sertifikat Data Science - Hacktiv8',
        'project-management': 'Sertifikat Project Management - Rumah Siap Kerja',
        'data-analyst': 'Sertifikat Data Analyst - Binar Academy'
    };
    
    alert(`Membuka: ${certificates[type]}\n\nSertifikat akan ditampilkan di jendela baru.`);
    // In actual implementation, this would open the certificate file
}

// Animation on scroll
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
