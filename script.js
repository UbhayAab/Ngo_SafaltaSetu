document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. THEME ENGINE --- */
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';

            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    }

    function updateIcons(theme) {
        if (!toggleBtn) return;
        const icon = toggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }


    /* --- MOBILE MENU TOGGLE --- */
    const mobileBtn = document.getElementById('mobile-menu-trigger');
    const navMenu = document.getElementById('nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Check state for icon update if needed (simple toggle for now)
        });
    }

    /* --- 2. SCROLL REVEAL "CRAZY" --- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve if you want re-trigger (optional, leaving unobserve for performance)
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger earlier

    document.querySelectorAll('.reveal-text, .glass-card, .partner-box').forEach(el => {
        observer.observe(el);
    });


    /* --- 3. 3D TILT EFFECT (Vanilla JS Implementation) --- */
    // Adds a subtle 3D tilt to all glass cards on mouse move
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (Sensitivity 20)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });


    /* --- 4. MOUSE PARALLAX FOR STREAKS --- */
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const streaks = document.querySelectorAll('.light-streak, .chakra-glow');
        streaks.forEach((streak, index) => {
            const speed = (index + 1) * 20;
            const x = (window.innerWidth - e.clientX * speed) / 100;
            const y = (window.innerHeight - e.clientY * speed) / 100;

            streak.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${index % 2 === 0 ? -10 : 10}deg)`;
        });
    });


    /* --- 5. NETWORK BUTTON CLICK --- */
    window.initiateNetworkProtocol = function (btnElement) {
        const originalText = btnElement.innerText;
        btnElement.innerText = "ENCRYPTING...";
        btnElement.style.borderColor = "var(--green-glow)";
        btnElement.style.color = "var(--green-glow)";

        setTimeout(() => {
            btnElement.innerText = "UPLINK SECURE";
            btnElement.style.background = "var(--green-glow)";
            btnElement.style.color = "#fff";

            // Create Simulation Overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0,0,0,0.8)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.color = '#fff';
            overlay.style.fontFamily = 'monospace';
            overlay.style.fontSize = '2rem';
            overlay.innerHTML = '<span class="blink">> ESTABLISHING SECURE HANDSHAKE...</span>';

            document.body.appendChild(overlay);

            // Flashing effect
            const style = document.createElement('style');
            style.innerHTML = `
                .blink { animation: blinker 0.2s linear infinite; }
                @keyframes blinker { 50% { opacity: 0; } }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                overlay.remove();
                style.remove();

                // Keep button state for a bit
                setTimeout(() => {
                    btnElement.innerText = originalText;
                    btnElement.style.background = "";
                    btnElement.style.color = "";
                    btnElement.style.borderColor = "";
                }, 2000);
            }, 1500);

        }, 1000);
    };

    document.querySelectorAll('.btn-network-action').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            window.initiateNetworkProtocol(btn);
        };
    });

});
