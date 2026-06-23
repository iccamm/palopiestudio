document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header scroll transition
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Responsive Mobile Menu
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const bars = menuToggle.querySelectorAll('.bar');
    if (menuToggle.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close menu and active scroll highlight handling
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      const bars = menuToggle.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    });
  });

  // Intersection Observer for scroll-reveal animations
  const revealElements = document.querySelectorAll('section, .value-card, .service-card, .pricing-card, .portfolio-card, .timeline-item, .testi-card');
  
  // Add class reveal to elements initially
  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Intersection Observer for active navigation links highlighting
  const sections = document.querySelectorAll('section[id]');
  const navObserverOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // FAQ Accordion exclusive toggle fallback
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    summary.addEventListener('click', (e) => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.hasAttribute('open')) {
          otherItem.removeAttribute('open');
        }
      });
    });
  });

  // PORTFOLIO MODAL INTERACTIVITY
  const modal = document.getElementById('portfolio-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  const projectsData = {
    1: {
      tag: "Website Development",
      title: "Landing Page Produk - FreshJuice.co (Interactive Showcase)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Oprek Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK LANDING PAGE</h5>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Judul Utama Juice:</label>
                <input type="text" id="juice-heading" value="Segarnya Jus Organik 100% Asli" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Tagline Slogan:</label>
                <input type="text" id="juice-tagline" value="Diproses dingin (cold-pressed) untuk menjaga vitamin dan nutrisi alami tetap utuh." style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Pilih Varian Default:</label>
                <select id="juice-flavor-select" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none; background: #fff;">
                  <option value="avocado">Green Avocado Cleanse</option>
                  <option value="orange">Sunset Citrus Carrot</option>
                  <option value="berry">Berry Antioxidant Burst</option>
                </select>
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Promo Diskon:</label>
                <input type="text" id="juice-promo" value="Diskon 20% Minggu Ini" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
            </div>
            
            <!-- Right: Premium Avocado/Orange Web Showcase -->
            <div class="juice-lp-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF3E0; color: #2D5A27; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(45, 90, 39, 0.15);">
              <!-- Navbar -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: #2D5A27; color: #FAF3E0;">
                <div style="font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                  <span>🥑</span> FreshJuice.co
                </div>
                <div style="display: flex; gap: 16px; font-size: 0.8rem; font-weight: 600;">
                  <span>Varian</span>
                  <span>Nutrisi</span>
                  <span>Ulasan</span>
                </div>
                <div style="background: #E07A5F; color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;" id="juice-badge-promo">Diskon 20% Minggu Ini</div>
              </div>
              
              <!-- Hero Section -->
              <div id="juice-hero-bg" style="padding: 40px 32px; background: linear-gradient(135deg, #e2ebd5, #FAF3E0); transition: all 0.5s ease;">
                <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: center;">
                  <div>
                    <span style="font-size: 0.75rem; font-weight: 800; background: rgba(45, 90, 39, 0.1); padding: 4px 8px; border-radius: 4px; text-transform: uppercase;" id="juice-flavor-tag">Premium Cleanse</span>
                    <h2 id="juice-main-title" style="font-size: 1.8rem; font-weight: 800; margin: 8px 0; line-height: 1.2; color: #2D5A27;">Segarnya Jus Organik 100% Asli</h2>
                    <p id="juice-main-tagline" style="font-size: 0.85rem; opacity: 0.9; line-height: 1.5; margin-bottom: 20px;">Diproses dingin (cold-pressed) untuk menjaga vitamin dan nutrisi alami tetap utuh.</p>
                    
                    <!-- Interactive Varian Selector Button -->
                    <div style="display: flex; gap: 8px; margin-bottom: 24px;">
                      <button class="juice-flavor-btn active" data-flavor="avocado" style="padding: 6px 12px; border: 1px solid #2D5A27; border-radius: 20px; background: #2D5A27; color: #fff; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;">🥑 Avocado</button>
                      <button class="juice-flavor-btn" data-flavor="orange" style="padding: 6px 12px; border: 1px solid #2D5A27; border-radius: 20px; background: transparent; color: #2D5A27; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;">🍊 Citrus Carrot</button>
                      <button class="juice-flavor-btn" data-flavor="berry" style="padding: 6px 12px; border: 1px solid #2D5A27; border-radius: 20px; background: transparent; color: #2D5A27; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;">🍓 Berry Burst</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 16px;">
                      <button style="background: #E07A5F; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; box-shadow: 0 4px 10px rgba(224, 122, 95, 0.3);">Pesan Sekarang</button>
                      <div style="font-weight: 800; font-size: 1.25rem;" id="juice-flavor-price">Rp28.000</div>
                    </div>
                  </div>
                  <!-- Visual area inside landing page -->
                  <div style="text-align: center; position: relative;">
                    <div id="juice-graphic" style="font-size: 6.5rem; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); animation: float 3s ease-in-out infinite;">🥑</div>
                    <div style="background: #fff; padding: 12px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); margin-top: 16px; text-align: left; border: 1px solid rgba(0,0,0,0.05);">
                      <div style="font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #7f8c8d; margin-bottom: 6px;">Kandungan Gizi</div>
                      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center; font-size: 0.7rem;">
                        <div style="background: #f7f9fa; padding: 4px; border-radius: 6px;"><strong style="display: block; color: #2D5A27;" id="gizi-cal">180</strong> kkal</div>
                        <div style="background: #f7f9fa; padding: 4px; border-radius: 6px;"><strong style="display: block; color: #2D5A27;" id="gizi-vit">90%</strong> Vit C</div>
                        <div style="background: #f7f9fa; padding: 4px; border-radius: 6px;"><strong style="display: block; color: #2D5A27;" id="gizi-sugar">8g</strong> Gula</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Benefits -->
              <div style="padding: 24px; background: #fff; border-top: 1px solid rgba(45, 90, 39, 0.1);">
                <h4 style="text-align: center; font-size: 1rem; font-weight: 800; margin-bottom: 16px;">🌱 Standard Organik Kami</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center; font-size: 0.75rem;">
                  <div style="padding: 12px; border-radius: 8px; background: #FAF3E0;">
                    <div style="font-size: 1.5rem; margin-bottom: 4px;">💯</div>
                    <strong>100% Buah Segar</strong>
                    <p style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Tanpa pengawet &amp; air tambahan.</p>
                  </div>
                  <div style="padding: 12px; border-radius: 8px; background: #FAF3E0;">
                    <div style="font-size: 1.5rem; margin-bottom: 4px;">🥬</div>
                    <strong>Organik Bersertifikat</strong>
                    <p style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Dari kebun petani lokal terpilih.</p>
                  </div>
                  <div style="padding: 12px; border-radius: 8px; background: #FAF3E0;">
                    <div style="font-size: 1.5rem; margin-bottom: 4px;">⚡</div>
                    <strong>Cold-Pressed Tech</strong>
                    <p style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">Nutrisi tidak rusak oleh panas pisau.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        // Interactive inputs
        const juiceHeading = container.querySelector('#juice-heading');
        const juiceTagline = container.querySelector('#juice-tagline');
        const juicePromo = container.querySelector('#juice-promo');
        const juiceFlavorSelect = container.querySelector('#juice-flavor-select');
        
        const previewTitle = container.querySelector('#juice-main-title');
        const previewTagline = container.querySelector('#juice-main-tagline');
        const previewPromo = container.querySelector('#juice-badge-promo');

        juiceHeading.addEventListener('input', () => { previewTitle.textContent = juiceHeading.value; });
        juiceTagline.addEventListener('input', () => { previewTagline.textContent = juiceTagline.value; });
        juicePromo.addEventListener('input', () => { 
          previewPromo.textContent = juicePromo.value; 
          previewPromo.style.display = juicePromo.value ? 'block' : 'none';
        });

        // Flavors data
        const flavors = {
          avocado: {
            name: "Green Avocado Cleanse",
            tag: "Superfood Cleanse",
            price: "Rp28.000",
            emoji: "🥑",
            bg: "linear-gradient(135deg, #e2ebd5, #FAF3E0)",
            calories: "210",
            vitc: "45%",
            sugar: "5g"
          },
          orange: {
            name: "Sunset Citrus Carrot",
            tag: "Immune Booster",
            price: "Rp24.000",
            emoji: "🍊",
            bg: "linear-gradient(135deg, #fcead7, #FAF3E0)",
            calories: "120",
            vitc: "120%",
            sugar: "11g"
          },
          berry: {
            name: "Berry Antioxidant Burst",
            tag: "Skin Glow & Fit",
            price: "Rp26.000",
            emoji: "🍓",
            bg: "linear-gradient(135deg, #fcdde3, #FAF3E0)",
            calories: "140",
            vitc: "95%",
            sugar: "9g"
          }
        };

        const updateFlavor = (flvId) => {
          const flv = flavors[flvId];
          if (!flv) return;

          container.querySelector('#juice-hero-bg').style.background = flv.bg;
          container.querySelector('#juice-flavor-tag').textContent = flv.tag;
          container.querySelector('#juice-flavor-price').textContent = flv.price;
          container.querySelector('#juice-graphic').textContent = flv.emoji;
          container.querySelector('#gizi-cal').textContent = flv.calories;
          container.querySelector('#gizi-vit').textContent = flv.vitc;
          container.querySelector('#gizi-sugar').textContent = flv.sugar;
        };

        juiceFlavorSelect.addEventListener('change', () => {
          updateFlavor(juiceFlavorSelect.value);
          // Sync button active class
          container.querySelectorAll('.juice-flavor-btn').forEach(btn => {
            if (btn.getAttribute('data-flavor') === juiceFlavorSelect.value) {
              btn.style.background = '#2D5A27';
              btn.style.color = '#fff';
            } else {
              btn.style.background = 'transparent';
              btn.style.color = '#2D5A27';
            }
          });
        });

        // Add event listeners to flavor buttons inside preview
        const flvButtons = container.querySelectorAll('.juice-flavor-btn');
        flvButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const flvId = btn.getAttribute('data-flavor');
            juiceFlavorSelect.value = flvId;
            updateFlavor(flvId);

            flvButtons.forEach(b => {
              b.style.background = 'transparent';
              b.style.color = '#2D5A27';
            });
            btn.style.background = '#2D5A27';
            btn.style.color = '#fff';
          });
        });
      }
    },
    2: {
      tag: "Website Development",
      title: "Website Company Profile - AstraConsulting (Interactive Showcase)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Oprek Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK COMPANY PROFILE</h5>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Nama Perusahaan:</label>
                <input type="text" id="corp-name-input" value="AstraConsulting" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Headline Bisnis:</label>
                <input type="text" id="corp-headline-input" value="Mitra Terpercaya Akselerasi Bisnis" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Total Klien Puas:</label>
                <input type="number" id="corp-clients-input" value="150" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
            </div>
            
            <!-- Right: Premium Purple & Gold Corporate Showcase -->
            <div class="corp-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF9F6; color: #1F0322; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(74, 14, 78, 0.15);">
              <!-- Top Header -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 18px 32px; background: #1F0322; color: #FAF9F6;">
                <div style="font-weight: 800; font-size: 1.15rem; color: #FAF9F6; display: flex; align-items: center; gap: 8px;">
                  <span style="color: #D4AF37;">⚜️</span> <span id="corp-logo-txt">AstraConsulting</span>
                </div>
                <div style="display: flex; gap: 24px; font-size: 0.85rem; font-weight: 600;">
                  <span style="color: #D4AF37;">Beranda</span>
                  <span>Solusi</span>
                  <span>Klien Kami</span>
                  <span>Kontak</span>
                </div>
              </div>
              
              <!-- Hero Banner -->
              <div style="padding: 48px 32px; background: linear-gradient(135deg, #2b0b2e, #1F0322); color: #fff; text-align: center; position: relative;">
                <div style="max-width: 580px; margin: 0 auto;">
                  <span style="font-size: 0.7rem; color: #D4AF37; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Firma Konsultan Profesional</span>
                  <h2 id="corp-headline-txt" style="font-size: 2rem; font-weight: 800; color: #FAF9F6; margin: 12px 0 16px 0; line-height: 1.3;">Mitra Terpercaya Akselerasi Bisnis</h2>
                  <p style="font-size: 0.85rem; color: #dfd5e0; line-height: 1.6; margin-bottom: 24px;">Kami mendampingi korporasi nasional dan UMKM berkembang pesat melalui penataan tata kelola keuangan, perancangan strategi pasar, dan integrasi teknologi modern.</p>
                  <div style="display: flex; justify-content: center; gap: 12px;">
                    <button style="background: #D4AF37; color: #1F0322; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">Jadwalkan Konsultasi</button>
                    <button style="background: transparent; color: #FAF9F6; border: 1.5px solid rgba(255,255,255,0.3); padding: 10px 24px; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">Pelajari Layanan</button>
                  </div>
                </div>
              </div>
              
              <!-- Stats Row -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 24px 32px; background: #fff; border-bottom: 1px solid rgba(0,0,0,0.05); text-align: center;">
                <div>
                  <div style="font-size: 1.8rem; font-weight: 800; color: #4A0E4E;"><span id="corp-stats-clients">150</span>+</div>
                  <div style="font-size: 0.75rem; color: #7f8c8d; font-weight: 600;">Klien Korporasi &amp; UMKM</div>
                </div>
                <div>
                  <div style="font-size: 1.8rem; font-weight: 800; color: #4A0E4E;">99.4%</div>
                  <div style="font-size: 0.75rem; color: #7f8c8d; font-weight: 600;">Success Rate Project</div>
                </div>
                <div>
                  <div style="font-size: 1.8rem; font-weight: 800; color: #4A0E4E;">10+</div>
                  <div style="font-size: 0.75rem; color: #7f8c8d; font-weight: 600;">Tahun Pengalaman Kerja</div>
                </div>
              </div>
              
              <!-- Core Services Grid -->
              <div style="padding: 40px 32px; background: #FAF9F6;">
                <h4 style="text-align: center; color: #4A0E4E; font-size: 1.1rem; font-weight: 800; margin-bottom: 24px;">Layanan Konsultasi Utama</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                  <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.2s;">
                    <div style="font-size: 1.75rem; margin-bottom: 8px;">📈</div>
                    <h5 style="font-weight: 800; font-size: 0.85rem; color: #4A0E4E; margin-bottom: 6px;">Strategi Bisnis</h5>
                    <p style="font-size: 0.7rem; color: #7f8c8d; line-height: 1.4;">Pembuatan roadmap pertumbuhan jangka panjang dan manajemen risiko pasar.</p>
                  </div>
                  <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.2s;">
                    <div style="font-size: 1.75rem; margin-bottom: 8px;">📊</div>
                    <h5 style="font-weight: 800; font-size: 0.85rem; color: #4A0E4E; margin-bottom: 6px;">Audit Keuangan</h5>
                    <p style="font-size: 0.7rem; color: #7f8c8d; line-height: 1.4;">Optimasi alokasi biaya, laporan kelayakan investasi, dan kepatuhan pajak.</p>
                  </div>
                  <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.2s;">
                    <div style="font-size: 1.75rem; margin-bottom: 8px;">💻</div>
                    <h5 style="font-weight: 800; font-size: 0.85rem; color: #4A0E4E; margin-bottom: 6px;">Otomasi Sistem</h5>
                    <p style="font-size: 0.7rem; color: #7f8c8d; line-height: 1.4;">Integrasi aplikasi operasional dan software keuangan modern.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const corpNameInput = container.querySelector('#corp-name-input');
        const corpHeadlineInput = container.querySelector('#corp-headline-input');
        const corpClientsInput = container.querySelector('#corp-clients-input');

        const logoTxt = container.querySelector('#corp-logo-txt');
        const headlineTxt = container.querySelector('#corp-headline-txt');
        const statsClients = container.querySelector('#corp-stats-clients');

        corpNameInput.addEventListener('input', () => { logoTxt.textContent = corpNameInput.value; });
        corpHeadlineInput.addEventListener('input', () => { headlineTxt.textContent = corpHeadlineInput.value; });
        corpClientsInput.addEventListener('input', () => { statsClients.textContent = corpClientsInput.value; });
      }
    },
    3: {
      tag: "Website Development",
      title: "Website E-commerce UMKM - Toko Gourmet (Interactive Showcase)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Control Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK E-COMMERCE</h5>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Nama Toko Online:</label>
                <input type="text" id="shop-name-input" value="Kedai Rempah Nusantara" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Diskon Promo (%):</label>
                <input type="number" id="shop-discount-input" value="15" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Biaya Ongkir (Rp):</label>
                <select id="shop-ongkir-select" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none; background: #fff;">
                  <option value="10000">Reguler (JNE/J&T) - Rp10.000</option>
                  <option value="20000">Ekspres (Sameday) - Rp20.000</option>
                  <option value="0">Gratis Ongkir - Rp0</option>
                </select>
              </div>
            </div>
            
            <!-- Right: Beautiful Terra-cotta Storefront -->
            <div class="shop-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif; background: #FDF6EC; color: #2C302E; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(166, 75, 42, 0.15); display: flex; flex-direction: column;">
              <!-- Nav header -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background: #A64B2A; color: #fff;">
                <div style="font-weight: 800; font-size: 1rem;" id="shop-logo-title">Kedai Rempah Nusantara</div>
                <div style="position: relative; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px;" id="shop-cart-trigger">
                  🛒 Keranjang (<span id="shop-cart-qty">0</span>)
                </div>
              </div>
              
              <!-- Promo Alert -->
              <div style="background: #FFE8E1; color: #A64B2A; font-weight: 700; font-size: 0.75rem; text-align: center; padding: 6px 12px; border-bottom: 1px solid rgba(166,75,42,0.1);" id="shop-promo-banner">
                Spesial Hari Ini: Diskon Tambahan <span id="shop-promo-val">15</span>% Untuk Semua Produk!
              </div>
              
              <!-- Main Store grid -->
              <div style="padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;" id="shop-grid">
                <!-- Item 1 -->
                <div class="shop-item-card" style="background: #fff; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                  <div style="background: #F5EFEB; font-size: 2.5rem; text-align: center; padding: 20px 0;">🌶️</div>
                  <div style="padding: 12px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
                    <div>
                      <h5 style="font-weight: 800; font-size: 0.8rem; margin-bottom: 4px;">Sambal Roa Khas Manado</h5>
                      <div style="font-size: 0.7rem; color: #7f8c8d; margin-bottom: 8px;">⭐⭐⭐⭐⭐ (4.9)</div>
                    </div>
                    <div>
                      <div style="display: flex; gap: 6px; align-items: baseline; margin-bottom: 8px;">
                        <span style="font-weight: 800; font-size: 0.85rem; color: #A64B2A;">Rp29.750</span>
                        <span style="font-size: 0.65rem; color: #a0aec0; text-decoration: line-through;">Rp35.000</span>
                      </div>
                      <button class="btn-shop-add" data-id="roa" data-name="Sambal Roa Manado" data-price="35000" style="width: 100%; border: none; padding: 8px; border-radius: 6px; background: #A64B2A; color:#fff; font-weight:700; font-size:0.7rem; cursor:pointer;">+ Keranjang</button>
                    </div>
                  </div>
                </div>

                <!-- Item 2 -->
                <div class="shop-item-card" style="background: #fff; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                  <div style="background: #F5EFEB; font-size: 2.5rem; text-align: center; padding: 20px 0;">🍪</div>
                  <div style="padding: 12px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
                    <div>
                      <h5 style="font-weight: 800; font-size: 0.8rem; margin-bottom: 4px;">Keripik Tempe Premium</h5>
                      <div style="font-size: 0.7rem; color: #7f8c8d; margin-bottom: 8px;">⭐⭐⭐⭐⭐ (4.8)</div>
                    </div>
                    <div>
                      <div style="display: flex; gap: 6px; align-items: baseline; margin-bottom: 8px;">
                        <span style="font-weight: 800; font-size: 0.85rem; color: #A64B2A;">Rp17.000</span>
                        <span style="font-size: 0.65rem; color: #a0aec0; text-decoration: line-through;">Rp20.000</span>
                      </div>
                      <button class="btn-shop-add" data-id="tempe" data-name="Keripik Tempe Premium" data-price="20000" style="width: 100%; border: none; padding: 8px; border-radius: 6px; background: #A64B2A; color:#fff; font-weight:700; font-size:0.7rem; cursor:pointer;">+ Keranjang</button>
                    </div>
                  </div>
                </div>

                <!-- Item 3 -->
                <div class="shop-item-card" style="background: #fff; border-radius: 8px; border: 1px solid rgba(0,0,0,0.04); overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                  <div style="background: #F5EFEB; font-size: 2.5rem; text-align: center; padding: 20px 0;">☕</div>
                  <div style="padding: 12px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between;">
                    <div>
                      <h5 style="font-weight: 800; font-size: 0.8rem; margin-bottom: 4px;">Kopi Bubuk Arabika Toraja</h5>
                      <div style="font-size: 0.7rem; color: #7f8c8d; margin-bottom: 8px;">⭐⭐⭐⭐⭐ (5.0)</div>
                    </div>
                    <div>
                      <div style="display: flex; gap: 6px; align-items: baseline; margin-bottom: 8px;">
                        <span style="font-weight: 800; font-size: 0.85rem; color: #A64B2A;">Rp42.500</span>
                        <span style="font-size: 0.65rem; color: #a0aec0; text-decoration: line-through;">Rp50.000</span>
                      </div>
                      <button class="btn-shop-add" data-id="kopi" data-name="Kopi Arabika Toraja" data-price="50000" style="width: 100%; border: none; padding: 8px; border-radius: 6px; background: #A64B2A; color:#fff; font-weight:700; font-size:0.7rem; cursor:pointer;">+ Keranjang</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cart Drawer Display (Fixed inside frame bottom) -->
              <div id="shop-cart-panel" style="background: #fff; border-top: 2px solid #A64B2A; padding: 16px; font-size: 0.75rem;">
                <div style="font-weight: 800; font-size: 0.85rem; color: #A64B2A; margin-bottom: 8px;">🛒 Detail Keranjang Belanja:</div>
                <div id="shop-cart-items-list" style="margin-bottom: 12px; max-height: 80px; overflow-y: auto;">
                  <span style="color: #7f8c8d; font-style: italic;">Belum ada barang di keranjang.</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.85rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 8px;">
                  <span>Total Bayar (incl. Ongkir):</span>
                  <span id="shop-cart-total" style="color: #A64B2A;">Rp0</span>
                </div>
                <button id="shop-checkout-btn" style="width: 100%; border: none; padding: 10px; border-radius: 6px; background: #E07A5F; color:#fff; font-weight:800; font-size:0.8rem; margin-top: 12px; cursor:pointer;" disabled>Checkout via WhatsApp</button>
              </div>
            </div>
          </div>
        `;

        const shopNameInput = container.querySelector('#shop-name-input');
        const shopDiscountInput = container.querySelector('#shop-discount-input');
        const shopOngkirSelect = container.querySelector('#shop-ongkir-select');

        const logoTitle = container.querySelector('#shop-logo-title');
        const promoVal = container.querySelector('#shop-promo-val');
        const cartQty = container.querySelector('#shop-cart-qty');
        const cartItemsList = container.querySelector('#shop-cart-items-list');
        const cartTotalDisplay = container.querySelector('#shop-cart-total');
        const checkoutBtn = container.querySelector('#shop-checkout-btn');

        let cart = {};

        shopNameInput.addEventListener('input', () => { logoTitle.textContent = shopNameInput.value; });
        shopDiscountInput.addEventListener('input', () => { 
          promoVal.textContent = shopDiscountInput.value; 
          updateCartUI();
        });
        shopOngkirSelect.addEventListener('change', () => {
          updateCartUI();
        });

        const updateCartUI = () => {
          const discountPct = parseFloat(shopDiscountInput.value) || 0;
          const ongkirVal = parseFloat(shopOngkirSelect.value) || 0;
          
          let totalQty = 0;
          let subtotal = 0;
          
          cartItemsList.innerHTML = '';
          
          Object.keys(cart).forEach(id => {
            const item = cart[id];
            const discountedPrice = item.price * (1 - discountPct / 100);
            const itemCost = discountedPrice * item.qty;
            
            subtotal += itemCost;
            totalQty += item.qty;

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justify = 'space-between';
            row.style.marginBottom = '4px';
            row.innerHTML = `
              <span>${item.name} (${item.qty}x)</span>
              <span>Rp${itemCost.toLocaleString('id-ID')}</span>
            `;
            cartItemsList.appendChild(row);
          });

          if (totalQty === 0) {
            cartItemsList.innerHTML = `<span style="color: #7f8c8d; font-style: italic;">Belum ada barang di keranjang.</span>`;
            cartTotalDisplay.textContent = 'Rp0';
            checkoutBtn.setAttribute('disabled', 'true');
          } else {
            const finalTotal = subtotal + ongkirVal;
            cartTotalDisplay.textContent = `Rp${finalTotal.toLocaleString('id-ID')}`;
            checkoutBtn.removeAttribute('disabled');
          }

          cartQty.textContent = totalQty;
        };

        const addButtons = container.querySelectorAll('.btn-shop-add');
        addButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            
            if (cart[id]) {
              cart[id].qty += 1;
            } else {
              cart[id] = { name, price, qty: 1 };
            }
            
            updateCartUI();
          });
        });

        checkoutBtn.addEventListener('click', () => {
          let itemsDesc = Object.values(cart).map(i => `- ${i.name} (${i.qty}x)`).join('%0A');
          let waUrl = `https://wa.me/6281214739276?text=Halo%20${shopNameInput.value},%20saya%20tertarik%20membeli:%0A${itemsDesc}%0ATotal:%20${cartTotalDisplay.textContent}`;
          window.open(waUrl, '_blank');
        });
      }
    },
    4: {
      tag: "UI UX Design",
      title: "Desain UI Mobile App - PulseFit (Interactive Simulator)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Control Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK MOBILE DESIGN</h5>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Target Langkah Harian:</label>
                <input type="number" id="app-step-goal" value="10000" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Jumlah Langkah Live:</label>
                <input type="range" id="app-step-live" min="0" max="15000" step="500" value="7200" style="width: 100%;">
                <span id="app-step-val-label" style="font-size: 0.7rem; font-weight: 700; color: var(--primary-teal);">7,200 langkah</span>
              </div>
              <button class="btn btn-teal" id="btn-app-trigger-notif" style="padding: 8px 16px; font-size: 0.75rem;">Kirim Push Notification 🔔</button>
            </div>

            <!-- Right: Smartphone Simulator -->
            <div class="phone-device-showcase" style="display: flex; justify-content: center; width: 100%;">
              <div style="width: 320px; height: 600px; background: #0D0B21; border: 12px solid #1c1a35; border-radius: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); overflow: hidden; display: flex; flex-direction: column; position: relative; color: #fff;">
                <!-- Phone Status Bar -->
                <div style="height: 24px; padding: 4px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 0.65rem; background: rgba(0,0,0,0.1); opacity: 0.8;">
                  <span>09:41</span>
                  <div style="display: flex; gap: 4px; font-size: 0.65rem;">
                    <span>📶</span>
                    <span>🔋 85%</span>
                  </div>
                </div>

                <!-- Live Notification banner inside smartphone -->
                <div id="app-push-banner" style="position: absolute; top: -70px; left: 12px; right: 12px; background: rgba(30, 20, 70, 0.95); color: #fff; padding: 10px 14px; border-radius: 12px; font-size: 0.7rem; border-left: 4px solid #39FF14; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; gap: 8px; align-items: center;">
                  <span style="font-size: 1.2rem;">🏆</span>
                  <div>
                    <strong style="display: block;">Langkah Kamu Meningkat!</strong>
                    <span style="opacity: 0.8;">Kerja bagus! Jantungmu berterima kasih.</span>
                  </div>
                </div>

                <!-- Main App Frame Content -->
                <div style="flex-grow: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;" id="phone-screen-body">
                  <!-- Header User Info -->
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <span style="font-size: 0.65rem; opacity: 0.6; display: block; text-transform: uppercase;">Selamat Pagi</span>
                      <strong style="font-size: 0.95rem; color: #00F0FF;">Muhammad Ikhsan</strong>
                    </div>
                    <span style="font-size: 1.5rem; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 50%;">🧑‍🚀</span>
                  </div>

                  <!-- Ring Activity SVG -->
                  <div style="background: rgba(255,255,255,0.04); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; align-items: center; position: relative;">
                    <span style="font-size: 0.65rem; color: #39FF14; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">Aktivitas Hari Ini</span>
                    <div style="position: relative; width: 130px; height: 130px;">
                      <svg width="130" height="130" style="transform: rotate(-90deg);">
                        <!-- Base Gray Ring -->
                        <circle cx="65" cy="65" r="50" fill="transparent" stroke="rgba(255,255,255,0.08)" stroke-width="12"></circle>
                        <!-- Active Colored Ring -->
                        <circle id="app-circle-stroke" cx="65" cy="65" r="50" fill="transparent" stroke="#39FF14" stroke-width="12" stroke-dasharray="314.15" stroke-dashoffset="80" stroke-linecap="round" style="transition: stroke-dashoffset 0.4s ease;"></circle>
                      </svg>
                      <!-- Text inside circle -->
                      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                        <span id="app-screen-steps" style="font-size: 1.25rem; font-weight: 800; display: block; color: #fff;">7.200</span>
                        <span style="font-size: 0.55rem; opacity: 0.6; text-transform: uppercase;">/ <span id="app-screen-goal">10K</span></span>
                      </div>
                    </div>
                  </div>

                  <!-- Mini widgets metrics -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                      <span style="font-size: 0.6rem; opacity: 0.6; display: block;">🔥 KALORI</span>
                      <strong style="font-size: 1.1rem; color: #FF8C32;" id="app-screen-calories">360</strong> <span style="font-size: 0.6rem; opacity: 0.6;">Kkal</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                      <span style="font-size: 0.6rem; opacity: 0.6; display: block;">💓 DETAK JANTUNG</span>
                      <strong style="font-size: 1.1rem; color: #ff3366;">78</strong> <span style="font-size: 0.6rem; opacity: 0.6;">BPM</span>
                    </div>
                  </div>

                  <!-- Exercise Log -->
                  <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="font-size: 0.75rem; font-weight: 800; display: flex; justify-content: space-between; margin-bottom: 12px;">
                      <span>Riwayat Latihan</span>
                      <span style="color: #00F0FF; font-size: 0.65rem;">Lihat Semua</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; font-size: 0.7rem;">
                        <span style="font-weight: 600;">🏃 Lari Pagi (Luar Ruangan)</span>
                        <span style="color: #39FF14; font-weight: 700;">4.2 Km</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; font-size: 0.7rem;">
                        <span style="font-weight: 600;">🚴 Bersepeda Sore</span>
                        <span style="color: #39FF14; font-weight: 700;">8.0 Km</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Phone Bottom Navigation -->
                <div style="height: 52px; background: #120E2E; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-around; align-items: center; font-size: 1.1rem;">
                  <span style="color: #39FF14; cursor: pointer;">🏠</span>
                  <span style="opacity: 0.5; cursor: pointer;">🏋️</span>
                  <span style="opacity: 0.5; cursor: pointer;">📊</span>
                  <span style="opacity: 0.5; cursor: pointer;">⚙️</span>
                </div>
              </div>
            </div>
          </div>
        `;

        const stepGoal = container.querySelector('#app-step-goal');
        const stepLive = container.querySelector('#app-step-live');
        const stepValLabel = container.querySelector('#app-step-val-label');
        
        const screenSteps = container.querySelector('#app-screen-steps');
        const screenGoal = container.querySelector('#app-screen-goal');
        const screenCalories = container.querySelector('#app-screen-calories');
        const circleStroke = container.querySelector('#app-circle-stroke');
        const notifBtn = container.querySelector('#btn-app-trigger-notif');
        const pushBanner = container.querySelector('#app-push-banner');

        const updateStepsUI = () => {
          const goal = parseFloat(stepGoal.value) || 10000;
          const live = parseFloat(stepLive.value) || 0;
          
          stepValLabel.textContent = `${live.toLocaleString('id-ID')} langkah`;
          screenSteps.textContent = live.toLocaleString('id-ID');
          screenGoal.textContent = goal >= 1000 ? `${(goal/1000).toFixed(0)}K` : goal;
          
          // Compute calories (approx 0.05 cal per step)
          const calories = Math.round(live * 0.05);
          screenCalories.textContent = calories;

          // Compute SVG Dash offset
          // Circle circumference = 2 * PI * r = 2 * 3.1415 * 50 = 314.15
          const totalCircumference = 314.15;
          const progress = Math.min(1, live / goal);
          const dashoffset = totalCircumference * (1 - progress);
          circleStroke.setAttribute('stroke-dashoffset', dashoffset);
        };

        stepGoal.addEventListener('input', updateStepsUI);
        stepLive.addEventListener('input', updateStepsUI);
        
        notifBtn.addEventListener('click', () => {
          pushBanner.style.top = '10px';
          setTimeout(() => {
            pushBanner.style.top = '-70px';
          }, 3000);
        });

        // Initialize UI
        updateStepsUI();
      }
    },
    5: {
      tag: "Analisis Data",
      title: "Visualisasi Dashboard SaaS - SaaSify (Interactive Showcase)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Control Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK DASHBOARD</h5>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Cari Pelanggan:</label>
                <input type="text" id="db-search" placeholder="Ketik nama / status..." style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Kategori Status:</label>
                <select id="db-status-filter" style="padding: 8px; border: 1px solid var(--border-soft); border-radius: 6px; font-size: 0.8rem; outline: none; background: #fff;">
                  <option value="all">Semua Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div style="font-size: 0.7rem; color: var(--muted-gray); line-height: 1.4;">
                Ketikkan kata kunci pencarian di atas untuk memfilter log transaksi di layar dashboard secara real-time.
              </div>
            </div>

            <!-- Right: Slate & Electric Violet SaaS Dashboard -->
            <div class="db-sass-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif; background: #F0F3F6; color: #1e2022; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(108, 93, 211, 0.15); display: grid; grid-template-columns: 200px 1fr; min-height: 480px;">
              <!-- Sidebar -->
              <div style="background: #1e2022; color: #FAF9F6; padding: 24px 16px; display: flex; flex-direction: column; gap: 24px;">
                <div style="font-weight: 800; font-size: 1.05rem; display: flex; align-items: center; gap: 6px; color: #6C5DD3;">
                  <span>📊</span> SaaSify
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.75rem; font-weight: 600; opacity: 0.9;">
                  <div style="background: rgba(108, 93, 211, 0.2); padding: 8px 12px; border-radius: 6px; color: #6C5DD3; cursor: pointer;">Ringkasan</div>
                  <div style="padding: 8px 12px; cursor: pointer; opacity: 0.7;">Transaksi</div>
                  <div style="padding: 8px 12px; cursor: pointer; opacity: 0.7;">Langganan</div>
                  <div style="padding: 8px 12px; cursor: pointer; opacity: 0.7;">Integrasi</div>
                </div>
              </div>

              <!-- Main Dashboard Area -->
              <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h4 style="font-size: 1.15rem; font-weight: 800; color: #1e2022;">Performa Omzet Penjualan</h4>
                  <span style="font-size: 0.7rem; background: #fff; padding: 6px 12px; border-radius: 20px; font-weight: 700; border: 1px solid rgba(0,0,0,0.05);">Periode: Live Sync</span>
                </div>

                <!-- Three metric cards -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                  <div style="background: #fff; padding: 16px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 4px 12px rgba(0,0,0,0.01);">
                    <span style="font-size: 0.65rem; color: #7f8c8d; font-weight: 600; text-transform: uppercase;">Total Pendapatan</span>
                    <strong style="font-size: 1.25rem; display: block; margin: 4px 0 8px 0; color: #1e2022;">Rp142.8M</strong>
                    <span style="color: #20C997; font-size: 0.65rem; font-weight: 700;">▲ +12.4% vs bln lalu</span>
                  </div>
                  <div style="background: #fff; padding: 16px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 4px 12px rgba(0,0,0,0.01);">
                    <span style="font-size: 0.65rem; color: #7f8c8d; font-weight: 600; text-transform: uppercase;">Registrasi Baru</span>
                    <strong style="font-size: 1.25rem; display: block; margin: 4px 0 8px 0; color: #1e2022;">4,812 User</strong>
                    <span style="color: #20C997; font-size: 0.65rem; font-weight: 700;">▲ +8.2% vs bln lalu</span>
                  </div>
                  <div style="background: #fff; padding: 16px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 4px 12px rgba(0,0,0,0.01);">
                    <span style="font-size: 0.65rem; color: #7f8c8d; font-weight: 600; text-transform: uppercase;">Rasio Churn</span>
                    <strong style="font-size: 1.25rem; display: block; margin: 4px 0 8px 0; color: #1e2022;">1.85%</strong>
                    <span style="color: #ff3366; font-size: 0.65rem; font-weight: 700;">▼ -0.3% vs bln lalu</span>
                  </div>
                </div>

                <!-- Transaction Log Table -->
                <div style="background: #fff; border-radius: 10px; border: 1px solid rgba(0,0,0,0.03); padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.01);">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #1e2022; margin-bottom: 12px;">Log Transaksi Pelanggan Terbaru</div>
                  <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem; text-align: left;" id="db-table-log">
                    <thead>
                      <tr style="border-bottom: 1.5px solid rgba(0,0,0,0.05); color: #7f8c8d; font-weight: bold;">
                        <th style="padding: 8px;">Pelanggan</th>
                        <th style="padding: 8px;">Tanggal</th>
                        <th style="padding: 8px;">Jumlah</th>
                        <th style="padding: 8px;">Status</th>
                      </tr>
                    </thead>
                    <tbody id="db-table-tbody">
                      <!-- Rows injected below -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;

        const transactions = [
          { name: "Ahmad Subagio", email: "ahmad@gmail.com", date: "24 Juni 2026", amount: "Rp350.000", status: "Paid" },
          { name: "Siti Rahma", email: "siti.rahma@yahoo.com", date: "23 Juni 2026", amount: "Rp125.000", status: "Pending" },
          { name: "Jessica Wijaya", email: "jessw@live.com", date: "23 Juni 2026", amount: "Rp450.000", status: "Paid" },
          { name: "Budi Hartono", email: "budi.h@outlook.com", date: "22 Juni 2026", amount: "Rp85.000", status: "Failed" },
          { name: "Devi Lestari", email: "devi@company.co.id", date: "21 Juni 2026", amount: "Rp500.000", status: "Paid" }
        ];

        const searchInput = container.querySelector('#db-search');
        const statusFilter = container.querySelector('#db-status-filter');
        const tbody = container.querySelector('#db-table-tbody');

        const renderTable = () => {
          const query = searchInput.value.toLowerCase();
          const filter = statusFilter.value;
          
          tbody.innerHTML = '';
          
          const filtered = transactions.filter(t => {
            const matchesQuery = t.name.toLowerCase().includes(query) || t.email.toLowerCase().includes(query) || t.status.toLowerCase().includes(query);
            const matchesStatus = filter === 'all' || t.status.toLowerCase() === filter;
            return matchesQuery && matchesStatus;
          });

          if (filtered.length === 0) {
            tbody.innerHTML = `
              <tr>
                <td colspan="4" style="text-align: center; padding: 16px; color: #7f8c8d; font-style: italic;">Data tidak ditemukan.</td>
              </tr>
            `;
            return;
          }

          filtered.forEach(t => {
            let badgeBg = '#20C997';
            let badgeCol = '#fff';
            if (t.status === 'Pending') {
              badgeBg = '#FF8C32';
            } else if (t.status === 'Failed') {
              badgeBg = '#ff3366';
            }

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(0,0,0,0.03)';
            tr.innerHTML = `
              <td style="padding: 8px;">
                <strong style="display:block;">${t.name}</strong>
                <span style="font-size:0.6rem; opacity:0.6;">${t.email}</span>
              </td>
              <td style="padding: 8px;">${t.date}</td>
              <td style="padding: 8px; font-weight:700;">${t.amount}</td>
              <td style="padding: 8px;">
                <span style="background: ${badgeBg}; color: ${badgeCol}; padding: 3px 8px; border-radius: 20px; font-size: 0.6rem; font-weight: 700;">${t.status}</span>
              </td>
            `;
            tbody.appendChild(tr);
          });
        };

        searchInput.addEventListener('input', renderTable);
        statusFilter.addEventListener('change', renderTable);

        // Init table rendering
        renderTable();
      }
    },
    6: {
      tag: "Analisis Data",
      title: "BioStat - Visualisasi Analisis Statistik (Interactive Showcase)",
      build: (container) => {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px;">
            <!-- Left: Control Panel -->
            <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 16px; height: fit-content;">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; border-bottom: 1px solid var(--border-soft); padding-bottom: 8px;">🛠️ OPREK BIOPLOT</h5>
              <div class="demo-control-group">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Nilai Korelasi (Slope):</label>
                <input type="range" id="slider-slope" min="-1" max="1" step="0.1" value="0.7">
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--primary-navy);">Tipe Model:</label>
                <div style="display: flex; gap: 6px;">
                  <button class="stats-model-btn active" data-model="linear" style="flex:1; border: 1px solid var(--primary-teal); background: var(--primary-teal); color: #fff; padding: 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">Regression</button>
                  <button class="stats-model-btn" data-model="anova" style="flex:1; border: 1px solid var(--border-soft); background: transparent; color: var(--primary-navy); padding: 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">ANOVA</button>
                </div>
              </div>
              <div style="font-size: 0.68rem; color: var(--muted-gray); line-height: 1.4;">
                Gunakan slider di atas untuk memanipulasi koefisien sebaran data dan melihat pergeseran garis kecocokan kuadrat terkecil.
              </div>
            </div>

            <!-- Right: Steel Blue SPSS-style clean Layout -->
            <div class="stats-bioplot-wrapper" style="font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(70, 130, 180, 0.15); display: flex; flex-direction: column; min-height: 480px;">
              <!-- Editor bar -->
              <div style="background: #34495E; color: #fff; padding: 14px 24px; font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.85rem;">📊 BioStat Tool v1.2 (Interactive Output)</strong>
                <div style="display:flex; gap:12px; opacity:0.8;">
                  <span>Raw Data</span>
                  <span style="text-decoration: underline; color: #00F0FF; font-weight: bold;">Plot Output</span>
                  <span>Console</span>
                </div>
              </div>

              <!-- Main Stats body -->
              <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 20px; padding: 20px; flex-grow: 1; background: #FAFBFD;">
                <!-- Plot display -->
                <div style="background: #fff; border: 1px solid var(--border-soft); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                  <span id="stats-plot-title" style="font-size: 0.75rem; font-weight: 800; color: #34495E; margin-bottom: 8px;">Uji Korelasi Regresi Linier</span>
                  <div style="width: 100%; aspect-ratio: 1.2;">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;" id="stats-main-svg">
                      <!-- Grid lines -->
                      <line x1="10" y1="90" x2="90" y2="90" stroke="#e2e8f0" stroke-width="0.5"></line>
                      <line x1="10" y1="10" x2="10" y2="90" stroke="#e2e8f0" stroke-width="0.5"></line>
                      
                      <!-- Line / Bars -->
                      <line id="trendline" x1="15" y1="75" x2="85" y2="25" stroke="#E07A5F" stroke-width="2" stroke-linecap="round"></line>
                      
                      <!-- Scatter Points -->
                      <circle cx="20" cy="74" r="2.5" fill="#4682B4"></circle>
                      <circle cx="35" cy="58" r="2.5" fill="#4682B4"></circle>
                      <circle cx="50" cy="48" r="2.5" fill="#4682B4"></circle>
                      <circle cx="65" cy="38" r="2.5" fill="#4682B4"></circle>
                      <circle cx="80" cy="24" r="2.5" fill="#4682B4"></circle>
                    </svg>
                  </div>
                </div>

                <!-- Parameters display panel -->
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <!-- Live stats summary cards -->
                  <div style="background: #EEF4F8; padding: 16px; border-radius: 8px; border: 1px solid rgba(70, 130, 180, 0.1);">
                    <h6 style="color: #34495E; font-size: 0.75rem; font-weight: 800; margin-bottom: 12px; text-transform: uppercase;">Hasil Analisis Model</h6>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.75rem;">
                      <div style="display:flex; justify-content:space-between;">
                        <span>Korelasi (r):</span>
                        <strong id="live-stat-r">0.70</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span>Determinasi (R²):</span>
                        <strong id="live-stat-r2">0.49</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span>p-value:</span>
                        <strong id="live-stat-p" style="color: #2D5A27;">&lt; 0.01 (Signifikan)</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span>F-Statistic:</span>
                        <strong id="live-stat-f">14.82</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Small raw data table -->
                  <div style="background: #fff; border: 1px solid var(--border-soft); border-radius: 8px; padding: 12px; flex-grow:1;">
                    <div style="font-size: 0.7rem; font-weight: bold; color: #7f8c8d; margin-bottom: 6px;">Sampel Data Masukan</div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.65rem; text-align: center;">
                      <thead>
                        <tr style="background:#f4f7f9; border-bottom: 1px solid var(--border-soft); font-weight: bold;">
                          <th style="padding:4px;">No</th>
                          <th style="padding:4px;">Variabel X</th>
                          <th style="padding:4px;">Variabel Y</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.02);">
                          <td style="padding:4px;">1</td>
                          <td style="padding:4px;">10.2</td>
                          <td style="padding:4px;" class="table-val-y">14.5</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.02);">
                          <td style="padding:4px;">2</td>
                          <td style="padding:4px;">12.4</td>
                          <td style="padding:4px;" class="table-val-y">18.2</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.02);">
                          <td style="padding:4px;">3</td>
                          <td style="padding:4px;">15.0</td>
                          <td style="padding:4px;" class="table-val-y">22.0</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.02);">
                          <td style="padding:4px;">4</td>
                          <td style="padding:4px;">18.5</td>
                          <td style="padding:4px;" class="table-val-y">27.4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const slopeSlider = container.querySelector('#slider-slope');
        const valR = container.querySelector('#live-stat-r');
        const valR2 = container.querySelector('#live-stat-r2');
        const valP = container.querySelector('#live-stat-p');
        const valF = container.querySelector('#live-stat-f');
        const trendline = container.querySelector('#trendline');
        const points = container.querySelectorAll('#stats-main-svg circle');
        const tableYVals = container.querySelectorAll('.table-val-y');
        
        let currentModel = "linear";

        const updateStatsPlot = () => {
          const slope = parseFloat(slopeSlider.value);
          
          if (currentModel === "linear") {
            valR.textContent = slope.toFixed(2);
            valR2.textContent = (slope * slope).toFixed(2);
            valF.textContent = (Math.abs(slope) * 20 + 2).toFixed(2);
            
            if (Math.abs(slope) >= 0.4) {
              valP.textContent = "< 0.05 (Signifikan)";
              valP.style.color = "#2D5A27";
            } else {
              valP.textContent = "> 0.05 (Tidak Signifikan)";
              valP.style.color = "#ff3366";
            }

            // Adjust y1 and y2 endpoints
            const y1 = 50 + (slope * -30);
            const y2 = 50 - (slope * -30);

            trendline.setAttribute('x1', '15');
            trendline.setAttribute('x2', '85');
            trendline.setAttribute('y1', y1);
            trendline.setAttribute('y2', y2);
            trendline.style.display = 'block';

            // Re-scatter points
            const offsets = [4, -3, 2, -2, 4];
            points.forEach((pt, index) => {
              const x = parseFloat(pt.getAttribute('cx'));
              const progress = (x - 15) / 70;
              const yBase = y1 + progress * (y2 - y1);
              const yFinal = Math.max(12, Math.min(88, yBase + offsets[index]));
              pt.setAttribute('cy', yFinal);
              pt.style.display = 'block';

              // Update Y columns in raw data table
              if (tableYVals[index]) {
                tableYVals[index].textContent = ((100 - yFinal) * 0.4).toFixed(1);
              }
            });
          } else {
            // ANOVA view - show vertical bars comparison instead of scatter points
            // Hide trendline and points, render simulated group comparison
            trendline.style.display = 'none';
            points.forEach(pt => pt.style.display = 'none');
            
            // Adjust to show mock bar charts
            valR.textContent = "N/A";
            valR2.textContent = "0.68";
            valF.textContent = (Math.abs(slope) * 15 + 4).toFixed(2);
            valP.textContent = "< 0.01 (Sangat Signifikan)";
            valP.style.color = "#2D5A27";
          }
        };

        slopeSlider.addEventListener('input', updateStatsPlot);

        const modelBtns = container.querySelectorAll('.stats-model-btn');
        modelBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            modelBtns.forEach(b => {
              b.classList.remove('active');
              b.style.background = 'transparent';
              b.style.color = 'var(--primary-navy)';
              b.style.borderColor = 'var(--border-soft)';
            });
            btn.classList.add('active');
            btn.style.background = 'var(--primary-teal)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--primary-teal)';

            currentModel = btn.getAttribute('data-model');
            container.querySelector('#stats-plot-title').textContent = currentModel === 'linear' ? 'Uji Korelasi Regresi Linier' : 'Uji Perbandingan Grup (ANOVA)';
            updateStatsPlot();
          });
        });

        // Init plot Y
        updateStatsPlot();
      }
    }
  };

  // Open modal handlers
  // PORTFOLIO FULLSCREEN SHOWCASE & DEEP LINKING
  const showcaseOverlay = document.getElementById('showcase-overlay');
  const showcaseBack = document.getElementById('showcase-back');
  const showcaseMockUrl = document.getElementById('showcase-mock-url');
  const showcaseFrame = document.getElementById('showcase-frame');
  const showcaseSidebar = document.getElementById('showcase-sidebar');
  const showcaseContainer = document.getElementById('showcase-container');
  const btnDesktop = document.getElementById('device-desktop');
  const btnMobile = document.getElementById('device-mobile');
  const btnShare = document.getElementById('showcase-share');

  const slugToId = {
    'juice': '1',
    'company': '2',
    'store': '3',
    'app': '4',
    'dashboard': '5',
    'stats': '6'
  };

  const idToSlug = {
    '1': 'juice',
    '2': 'company',
    '3': 'store',
    '4': 'app',
    '5': 'dashboard',
    '6': 'stats'
  };

  const idToMockUrl = {
    '1': 'palopi.web.id/portfolio/organic-juice-lp',
    '2': 'palopi.web.id/portfolio/company-profile',
    '3': 'palopi.web.id/portfolio/online-store-umkm',
    '4': 'palopi.web.id/portfolio/mobile-app-ui',
    '5': 'palopi.web.id/portfolio/analytics-dashboard',
    '6': 'palopi.web.id/portfolio/statistics-plot'
  };

  function openShowcase(id) {
    const data = projectsData[id];
    if (!data) return;

    showcaseMockUrl.textContent = idToMockUrl[id] || 'palopi.web.id/portfolio/demo';
    
    showcaseSidebar.innerHTML = '';
    showcaseFrame.innerHTML = '';
    
    // Build content inside showcaseFrame
    data.build(showcaseFrame);

    // Reposition Oprek sidebar if available for a cleaner split pane experience
    const innerGrid = showcaseFrame.querySelector('div[style*="grid-template-columns"]');
    if (innerGrid) {
      const oprekPanel = innerGrid.children[0];
      const previewPanel = innerGrid.children[1];
      if (oprekPanel && previewPanel) {
        showcaseSidebar.appendChild(oprekPanel);
        oprekPanel.style.width = '100%';
        oprekPanel.style.border = 'none';
        oprekPanel.style.background = 'transparent';
        oprekPanel.style.padding = '0';

        showcaseFrame.innerHTML = '';
        showcaseFrame.appendChild(previewPanel);
        previewPanel.style.height = '100%';
      }
    } else {
      // If there is no left oprek panel grid in the project code, provide a default nice message in sidebar
      showcaseSidebar.innerHTML = `
        <div style="background: var(--soft-bg); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-soft);">
          <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 0.95rem; margin-bottom: 8px;">ℹ️ INFO SHOWCASE</h5>
          <p style="font-size: 0.8rem; line-height: 1.4; color: var(--primary-navy);">Project ini dirancang interaktif. Klik tombol atau operasikan simulasi secara langsung di layar utama.</p>
        </div>
      `;
    }

    showcaseOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update URL query parameters
    const slug = idToSlug[id] || id;
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?demo=' + slug;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  function closeShowcase() {
    showcaseOverlay.classList.remove('active');
    document.body.style.overflow = '';
    showcaseContainer.classList.remove('view-mobile');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
    
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({ path: cleanUrl }, '', cleanUrl);
  }

  showcaseBack.addEventListener('click', closeShowcase);

  btnDesktop.addEventListener('click', () => {
    showcaseContainer.classList.remove('view-mobile');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
  });

  btnMobile.addEventListener('click', () => {
    showcaseContainer.classList.add('view-mobile');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
  });

  btnShare.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const originalText = btnShare.textContent;
      btnShare.textContent = 'Link Disalin!';
      btnShare.style.backgroundColor = 'var(--primary-teal)';
      setTimeout(() => {
        btnShare.textContent = originalText;
        btnShare.style.backgroundColor = '';
      }, 2000);
    });
  });

  // Check URL params on load
  const urlParams = new URLSearchParams(window.location.search);
  const demoParam = urlParams.get('demo');
  if (demoParam) {
    const projectId = slugToId[demoParam] || demoParam;
    if (projectsData[projectId]) {
      setTimeout(() => {
        openShowcase(projectId);
      }, 200);
    }
  }

  // Set card clicks to open the new fullscreen showcase
  portfolioCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      openShowcase(id);
    });
  });

  // INTERACTIVE SERVICE ESTIMATOR & CHECKOUT
  const packageSelect = document.getElementById('estimator-package-select');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const summaryDetails = document.getElementById('estimator-summary-details');
  const totalPriceDisplay = document.getElementById('estimator-total-price');
  const checkoutBtn = document.getElementById('estimator-checkout-btn');

  function calculateEstimate() {
    let selectedPackageText = "";
    let selectedPackagePrice = 0;
    
    // Get package info
    const selectedOption = packageSelect.options[packageSelect.selectedIndex];
    if (selectedOption.value !== "none") {
      selectedPackageText = selectedOption.text;
      selectedPackagePrice = parseFloat(selectedOption.getAttribute('data-price')) || 0;
    }

    // Get selected addons
    let selectedAddons = [];
    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const name = cb.getAttribute('data-name');
        const price = parseFloat(cb.getAttribute('data-price')) || 0;
        selectedAddons.push({ name, price });
        addonsTotal += price;
      }
    });

    const totalEstimate = selectedPackagePrice + addonsTotal;

    // Update Summary UI
    if (selectedPackagePrice === 0 && selectedAddons.length === 0) {
      summaryDetails.innerHTML = `<p style="color: var(--muted-gray); font-style: italic; margin: 0;">Centang add-on di atas atau pilih paket utama untuk merancang pesanan...</p>`;
      totalPriceDisplay.textContent = "Rp0";
      checkoutBtn.setAttribute('disabled', 'true');
    } else {
      let detailsHTML = `<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px;">`;
      if (selectedPackagePrice > 0) {
        detailsHTML += `
          <li style="display:flex; justify-content:space-between; font-weight:700; color: var(--primary-navy);">
            <span>📦 ${selectedPackageText.split(' - ')[0]}</span>
            <span>Rp${selectedPackagePrice.toLocaleString('id-ID')}</span>
          </li>
        `;
      }
      selectedAddons.forEach(addon => {
        detailsHTML += `
          <li style="display:flex; justify-content:space-between; color: var(--muted-gray);">
            <span>➕ ${addon.name}</span>
            <span>Rp${addon.price.toLocaleString('id-ID')}</span>
          </li>
        `;
      });
      detailsHTML += `</ul>`;
      summaryDetails.innerHTML = detailsHTML;
      totalPriceDisplay.textContent = `Rp${totalEstimate.toLocaleString('id-ID')}`;
      checkoutBtn.removeAttribute('disabled');
    }
  }

  if (packageSelect) {
    packageSelect.addEventListener('change', calculateEstimate);
  }
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateEstimate);
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const selectedOption = packageSelect.options[packageSelect.selectedIndex];
      let message = "Halo Palopi Estudio, saya ingin berkonsultasi & memesan layanan kustom berikut:%0A%0A";
      
      if (selectedOption.value !== "none") {
        message += `*Paket Utama:*%0A- ${selectedOption.text}%0A%0A`;
      }

      let selectedAddons = [];
      addonCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedAddons.push(`- ${cb.getAttribute('data-name')} (Rp${parseFloat(cb.getAttribute('data-price')).toLocaleString('id-ID')})`);
        }
      });

      if (selectedAddons.length > 0) {
        message += `*Layanan Tambahan (Add-on):*%0A${selectedAddons.join('%0A')}%0A%0A`;
      }

      message += `*Total Estimasi:* ${totalPriceDisplay.textContent}%0A%0AMohon konfirmasi rincian pesanan ini. Terima kasih!`;
      
      const waUrl = `https://wa.me/6281214739276?text=${message}`;
      window.open(waUrl, '_blank');
    });
  }

  // Close showcase on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showcaseOverlay.classList.contains('active')) {
      closeShowcase();
    }
  });
});

