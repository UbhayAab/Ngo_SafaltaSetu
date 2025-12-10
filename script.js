document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Mock
    window.showMessage = function() {
        const messageElement = document.getElementById('form-message');
        const btn = document.querySelector('.contact-form button');
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            messageElement.textContent = "Thank you! Your message has been sent successfully.";
            messageElement.style.opacity = 1;
            btn.textContent = 'Send Message';
            btn.disabled = false;
            document.querySelector('.contact-form').reset();
            
            setTimeout(() => {
                messageElement.style.opacity = 0;
                messageElement.textContent = "";
            }, 5000);
        }, 1500);
    };

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card, .program-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
