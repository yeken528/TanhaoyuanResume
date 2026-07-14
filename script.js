document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-menu a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-intro, .education-card, .skills-category, .experience-card, .project-card, .certificate-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    const summaryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.summary-number');
                numbers.forEach((number, index) => {
                    setTimeout(() => {
                        animateNumber(number);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const certificatesSummary = document.querySelector('.certificates-summary');
    if (certificatesSummary) {
        summaryObserver.observe(certificatesSummary);
    }

    function animateNumber(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
            const target = parseInt(match[1]);
            let current = 0;
            const duration = 1500;
            const step = target / (duration / 16);

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = text.replace(/(\d+)/, Math.floor(current));
            }, 16);
        }
    }

    const skillFills = document.querySelectorAll('.skill-fill');
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillFills.forEach((fill, index) => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width;
                    }, index * 150);
                });
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);

    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    const heroScroll = document.querySelector('.hero-scroll');
    heroScroll.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    const certificatesToggle = document.getElementById('certificatesToggle');
    const certificatesMore = document.getElementById('certificatesMore');

    certificatesToggle.addEventListener('click', () => {
        certificatesMore.classList.toggle('show');
        certificatesToggle.classList.toggle('active');
        const span = certificatesToggle.querySelector('span');
        span.textContent = certificatesMore.classList.contains('show') ? '收起' : '展开更多';
    });

    const wechatContact = document.querySelector('.wechat-contact');
    const wechatQr = document.querySelector('.wechat-qr');

    wechatContact.addEventListener('click', (e) => {
        e.stopPropagation();
        wechatQr.classList.toggle('visible');
    });

    document.addEventListener('click', (e) => {
        if (!wechatContact.contains(e.target)) {
            wechatQr.classList.remove('visible');
        }
    });

    createParticles();

    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = `${-Math.random() * 100}px`;
            particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            container.appendChild(particle);
        }
    }

    const introItems = document.querySelectorAll('.intro-item');
    introItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + index * 150);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + index * 100);
    });

    const footerSocialLinks = document.querySelectorAll('.social-link');
    footerSocialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });

    initParticleNetwork();

    function initParticleNetwork() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let particles = [];
        let mouse = { x: null, y: null, radius: 180 };
        let animationId = null;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function getParticleCount() {
            const width = window.innerWidth;
            const area = width * window.innerHeight;
            if (width < 480) {
                return Math.min(30, Math.max(20, Math.floor(area / 15000)));
            } else if (width < 768) {
                return Math.min(50, Math.max(25, Math.floor(area / 13000)));
            }
            return Math.min(140, Math.max(50, Math.floor(area / 12000)));
        }

        class Particle {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.8;
                this.baseSize = this.size;
                const colors = [
                    { r: 139, g: 92, b: 246 },
                    { r: 6, g: 182, b: 212 },
                    { r: 167, g: 139, b: 250 }
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                if (this.x < 0) this.x = 0;
                if (this.x > canvas.width) this.x = canvas.width;
                if (this.y < 0) this.y = 0;
                if (this.y > canvas.height) this.y = canvas.height;

                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= dx * force * 0.03;
                        this.y -= dy * force * 0.03;
                        this.size = this.baseSize + force * 2;
                    } else {
                        this.size = this.baseSize;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initParticles() {
            particles = [];
            const count = getParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            const maxDist = 140;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.35;
                        const grad = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        grad.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
                        grad.addColorStop(1, `rgba(6, 182, 212, ${opacity})`);
                        ctx.beginPath();
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const opacity = (1 - dist / mouse.radius) * 0.6;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 200);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            } else {
                if (!animationId) {
                    animate();
                }
            }
        });

        resizeCanvas();
        initParticles();
        animate();
    }
});