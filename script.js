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

  // Project data configuration
  const projectsData = {
    1: {
      tag: "Website Development",
      title: "Landing Page Produk (Interactive Demo)",
      build: (container) => {
        container.innerHTML = `
          <div class="demo-site-preview">
            <div class="demo-site-nav" id="demo-nav">
              <div class="demo-site-logo">FreshJuice.co</div>
              <div class="demo-site-menu">
                <button class="demo-tab-btn active" data-tab="hero">Home</button>
                <button class="demo-tab-btn" data-tab="details">Manfaat</button>
                <button class="demo-tab-btn" data-tab="reviews">Ulasan</button>
              </div>
            </div>
            <div class="demo-site-body" id="demo-body" style="background-color: #f7fafc; transition: all 0.3s ease;">
              <div class="demo-site-hero">
                <h4 style="color: var(--primary-navy)">Segarkan Harimu Dengan Jus Organik</h4>
                <p>100% buah asli pilihan tanpa pemanis buatan atau bahan pengawet. Menjaga daya tahan tubuh tetap prima setiap saat.</p>
                <button class="btn btn-teal" style="padding: 10px 20px; font-size: 0.85rem;" id="demo-action-btn">Pesan Sekarang</button>
              </div>
            </div>
            <div style="background-color: #fff; padding: 16px; border-top: 1px solid var(--border-soft); display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
              <span><strong>Ubah Tema Warna:</strong></span>
              <div style="display: flex; gap: 8px;">
                <span class="color-dot" data-color="#23BFC2" style="width: 20px; height: 20px; border-radius: 50%; background: #23BFC2; cursor: pointer; border: 2px solid #fff; box-shadow: 0 0 4px rgba(0,0,0,0.2);"></span>
                <span class="color-dot" data-color="#F07C42" style="width: 20px; height: 20px; border-radius: 50%; background: #F07C42; cursor: pointer; border: 2px solid #fff; box-shadow: 0 0 4px rgba(0,0,0,0.2);"></span>
                <span class="color-dot" data-color="#4caf50" style="width: 20px; height: 20px; border-radius: 50%; background: #4caf50; cursor: pointer; border: 2px solid #fff; box-shadow: 0 0 4px rgba(0,0,0,0.2);"></span>
              </div>
            </div>
          </div>
        `;

        // Tab switches
        const tabs = container.querySelectorAll('.demo-tab-btn');
        const bodyContent = container.querySelector('#demo-body');
        
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            
            if (target === 'hero') {
              bodyContent.innerHTML = `
                <div class="demo-site-hero">
                  <h4 style="color: var(--primary-navy)">Segarkan Harimu Dengan Jus Organik</h4>
                  <p>100% buah asli pilihan tanpa pemanis buatan atau bahan pengawet. Menjaga daya tahan tubuh tetap prima setiap saat.</p>
                  <button class="btn btn-teal" style="padding: 10px 20px; font-size: 0.85rem;">Pesan Sekarang</button>
                </div>
              `;
            } else if (target === 'details') {
              bodyContent.innerHTML = `
                <div>
                  <h4 style="color: var(--primary-navy)">Kenapa Memilih Kami?</h4>
                  <div class="demo-site-features">
                    <div class="demo-feat-card">
                      <h5>Organik Asli</h5>
                      <p style="font-size: 0.75rem;">Tanpa bahan kimia & pestisida buatan.</p>
                    </div>
                    <div class="demo-feat-card">
                      <h5>Fresh-Pressed</h5>
                      <p style="font-size: 0.75rem;">Diperas langsung saat pesanan diproses.</p>
                    </div>
                    <div class="demo-feat-card">
                      <h5>Nutrisi Utuh</h5>
                      <p style="font-size: 0.75rem;">Teknologi cold-pressed menjaga vitamin.</p>
                    </div>
                  </div>
                </div>
              `;
            } else if (target === 'reviews') {
              bodyContent.innerHTML = `
                <div>
                  <h4 style="color: var(--primary-navy)">Ulasan Pelanggan</h4>
                  <p style="font-style: italic; font-size: 0.95rem; margin-top: 16px; color: var(--muted-gray);">"Jusnya enak sekali, anak-anak suka dan rasanya segar sekali pagi hari!"</p>
                  <strong style="display: block; font-size: 0.8rem; margin-top: 8px; color: var(--primary-navy);">- Budi Santoso</strong>
                </div>
              `;
            }
          });
        });

        // Theme colors
        const colorDots = container.querySelectorAll('.color-dot');
        const nav = container.querySelector('#demo-nav');
        
        colorDots.forEach(dot => {
          dot.addEventListener('click', () => {
            const color = dot.getAttribute('data-color');
            nav.style.backgroundColor = color;
            const actionBtn = container.querySelector('#demo-action-btn');
            if (actionBtn) actionBtn.style.backgroundColor = color;
          });
        });
      }
    },
    2: {
      tag: "Website Development",
      title: "Website Company Profile (Interactive Demo)",
      build: (container) => {
        container.innerHTML = `
          <div class="demo-site-preview">
            <div class="demo-site-nav" style="background-color: var(--primary-navy);">
              <div class="demo-site-logo">AstraConsulting</div>
              <div class="demo-site-menu">
                <button class="demo-tab-btn active" data-tab="home">Beranda</button>
                <button class="demo-tab-btn" data-tab="about">Tentang Kami</button>
                <button class="demo-tab-btn" data-tab="services">Layanan</button>
              </div>
            </div>
            <div class="demo-site-body" id="demo-body" style="text-align: left; padding: 32px;">
              <h4 style="font-size: 1.5rem; color: var(--primary-navy); margin-bottom: 8px;">Mitra Terpercaya Menuju Transformasi Bisnis</h4>
              <p>Membantu perusahaan merancang strategi, mengoptimalkan proses operasional, dan menerapkan teknologi modern demi efisiensi bisnis berkelanjutan.</p>
              <div style="margin-top: 24px; border-left: 4px solid var(--primary-teal); padding-left: 16px;">
                <h5 style="color: var(--primary-navy)">Visi Perusahaan</h5>
                <p style="font-size: 0.85rem;">Menjadi firma konsultasi bisnis terdepan yang menggerakkan inovasi dan memberikan dampak nyata di Asia Tenggara.</p>
              </div>
            </div>
          </div>
        `;

        const tabs = container.querySelectorAll('.demo-tab-btn');
        const bodyContent = container.querySelector('#demo-body');
        
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            
            if (target === 'home') {
              bodyContent.innerHTML = `
                <h4 style="font-size: 1.5rem; color: var(--primary-navy); margin-bottom: 8px;">Mitra Terpercaya Menuju Transformasi Bisnis</h4>
                <p>Membantu perusahaan merancang strategi, mengoptimalkan proses operasional, dan menerapkan teknologi modern demi efisiensi bisnis berkelanjutan.</p>
                <div style="margin-top: 24px; border-left: 4px solid var(--primary-teal); padding-left: 16px;">
                  <h5 style="color: var(--primary-navy)">Visi Perusahaan</h5>
                  <p style="font-size: 0.85rem;">Menjadi firma konsultasi bisnis terdepan yang menggerakkan inovasi dan memberikan dampak nyata di Asia Tenggara.</p>
                </div>
              `;
            } else if (target === 'about') {
              bodyContent.innerHTML = `
                <h4 style="font-size: 1.25rem; color: var(--primary-navy); margin-bottom: 12px;">Profil &amp; Rekam Jejak</h4>
                <p>Didirikan sejak 2018, kami telah mendampingi lebih dari 150 perusahaan multinasional dan UMKM berkembang pesat melalui penataan struktur bisnis dan adopsi transformasi digital modern.</p>
                <p style="margin-top: 12px;">Tim kami terdiri dari pakar keuangan, analis data senior, dan arsitek sistem yang berpengalaman lebih dari 10 tahun.</p>
              `;
            } else if (target === 'services') {
              bodyContent.innerHTML = `
                <h4 style="font-size: 1.25rem; color: var(--primary-navy); margin-bottom: 12px;">Solusi Bisnis Kami</h4>
                <div class="demo-site-features" style="margin-top: 16px;">
                  <div class="demo-feat-card">
                    <h5>Strategi Bisnis</h5>
                    <p style="font-size: 0.75rem;">Perencanaan roadmap pertumbuhan jangka panjang.</p>
                  </div>
                  <div class="demo-feat-card">
                    <h5>Transformasi Digital</h5>
                    <p style="font-size: 0.75rem;">Integrasi sistem ERP dan otomasi alur kerja.</p>
                  </div>
                  <div class="demo-feat-card">
                    <h5>Manajemen Keuangan</h5>
                    <p style="font-size: 0.75rem;">Optimasi biaya operasional dan perencanaan audit.</p>
                  </div>
                </div>
              `;
            }
          });
        });
      }
    },
    3: {
      tag: "Website Development",
      title: "Website Toko Online UMKM (Interactive Demo)",
      build: (container) => {
        container.innerHTML = `
          <div style="background-color: var(--soft-bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-soft); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 800; color: var(--primary-navy);">Palopi Shop</div>
            <div style="position: relative; font-weight: 700; color: var(--primary-navy);">
              🛒 Keranjang: <span id="cart-count" style="background: var(--accent-orange); color: #fff; padding: 2px 8px; border-radius: 20px; font-size: 0.75rem;">0</span>
            </div>
          </div>
          <div class="demo-store-grid">
            <div class="demo-store-card">
              <div class="demo-store-img">🌶️</div>
              <div class="demo-store-info">
                <h5>Sambal Bawang Asli</h5>
                <span class="demo-store-price">Rp25.000</span>
                <button class="btn btn-teal add-to-cart" style="padding: 6px 12px; font-size: 0.75rem; width: 100%;" data-item="Sambal Bawang">Tambah Ke Keranjang</button>
              </div>
            </div>
            <div class="demo-store-card">
              <div class="demo-store-img">🍪</div>
              <div class="demo-store-info">
                <h5>Keripik Tempe Renyah</h5>
                <span class="demo-store-price">Rp15.000</span>
                <button class="btn btn-teal add-to-cart" style="padding: 6px 12px; font-size: 0.75rem; width: 100%;" data-item="Keripik Tempe">Tambah Ke Keranjang</button>
              </div>
            </div>
            <div class="demo-store-card">
              <div class="demo-store-img">☕</div>
              <div class="demo-store-info">
                <h5>Kopi Bubuk Arabika</h5>
                <span class="demo-store-price">Rp45.000</span>
                <button class="btn btn-teal add-to-cart" style="padding: 6px 12px; font-size: 0.75rem; width: 100%;" data-item="Kopi Arabika">Tambah Ke Keranjang</button>
              </div>
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <button class="btn btn-orange" id="btn-checkout" style="padding: 10px 24px; font-size: 0.85rem;" disabled>Checkout via WhatsApp</button>
          </div>
        `;

        let cart = {};
        const countBadge = container.querySelector('#cart-count');
        const checkoutBtn = container.querySelector('#btn-checkout');
        const storeButtons = container.querySelectorAll('.add-to-cart');

        storeButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const item = btn.getAttribute('data-item');
            cart[item] = (cart[item] || 0) + 1;
            
            // Update UI count
            let total = Object.values(cart).reduce((sum, count) => sum + count, 0);
            countBadge.textContent = total;
            
            // Enable checkout button
            if (total > 0) {
              checkoutBtn.removeAttribute('disabled');
            }
          });
        });

        checkoutBtn.addEventListener('click', () => {
          let itemsText = Object.entries(cart).map(([name, count]) => `- ${name} (${count}x)`).join('%0A');
          let waUrl = `https://wa.me/6281214739276?text=Halo%20Palopi%20Estudio,%20saya%20ingin%20memesan:%0A${itemsText}`;
          window.open(waUrl, '_blank');
        });
      }
    },
    4: {
      tag: "UI UX Design",
      title: "Desain UI Mobile App (Interactive Simulator)",
      build: (container) => {
        container.innerHTML = `
          <div class="demo-phone-wrapper">
            <div class="demo-phone">
              <div class="demo-phone-screen">
                <div class="demo-phone-header">
                  <span>📱 Palopi App Simulator</span>
                </div>
                <div class="demo-phone-body" id="phone-body">
                  <div style="text-align: center; padding-top: 30px;">
                    <span style="font-size: 3rem;">👋</span>
                    <h5 style="font-size: 1.1rem; color: var(--primary-navy); margin-top: 12px; font-weight: 800;">Selamat Datang!</h5>
                    <p style="font-size: 0.75rem; color: var(--muted-gray); margin-top: 6px;">Silakan isi form sederhana untuk masuk ke simulasi menu.</p>
                  </div>
                  <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 10px;">
                    <input type="text" placeholder="Username" id="sim-username" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-soft); font-size: 0.75rem; outline: none;">
                    <input type="password" placeholder="Password" id="sim-password" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-soft); font-size: 0.75rem; outline: none;">
                  </div>
                  <button class="demo-phone-btn" id="btn-sim-login" style="margin-top: 24px;">Masuk Ke Aplikasi</button>
                </div>
              </div>
            </div>
          </div>
        `;

        const phoneBody = container.querySelector('#phone-body');
        const loginBtn = container.querySelector('#btn-sim-login');

        loginBtn.addEventListener('click', () => {
          phoneBody.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; height: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h6 style="font-size: 0.85rem; font-weight: 800; color: var(--primary-navy);">Dashboard Utama</h6>
                <span id="btn-logout" style="font-size: 0.65rem; color: var(--accent-orange); cursor: pointer; font-weight: 700;">Keluar</span>
              </div>
              <div class="demo-phone-card">
                <span style="font-size: 0.65rem; font-weight: 700; color: var(--primary-teal);">STATISTIK</span>
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-navy);">89.4% Skor</div>
                <p style="font-size: 0.65rem; margin-top: 2px;">Data performa minggu ini.</p>
              </div>
              <div class="demo-phone-card" style="border-left-color: var(--accent-orange);">
                <span style="font-size: 0.65rem; font-weight: 700; color: var(--accent-orange);">AKTIVITAS</span>
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-navy);">1,280 Klik</div>
                <p style="font-size: 0.65rem; margin-top: 2px;">Kunjungan pengguna baru.</p>
              </div>
              <button class="demo-phone-btn" style="background-color: var(--primary-navy);" id="btn-toggle-dark">Toggle Dark Mode</button>
            </div>
          `;

          // Handle sub-buttons inside phone
          const darkBtn = phoneBody.querySelector('#btn-toggle-dark');
          darkBtn.addEventListener('click', () => {
            const screen = container.querySelector('.demo-phone-screen');
            if (screen.style.backgroundColor === 'rgb(12, 31, 46)') {
              screen.style.backgroundColor = '#fff';
              screen.style.color = 'var(--dark-text)';
            } else {
              screen.style.backgroundColor = '#0c1f2e';
              screen.style.color = '#fff';
            }
          });

          const logoutBtn = phoneBody.querySelector('#btn-logout');
          logoutBtn.addEventListener('click', () => {
            // Rebuild original login screen
            projectsData[4].build(container);
          });
        });
      }
    },
    5: {
      tag: "Analisis Data",
      title: "Visualisasi Dashboard Data (Interactive Demo)",
      build: (container) => {
        container.innerHTML = `
          <div class="demo-db-header">
            <h4 style="color: var(--primary-navy); font-weight: 800; font-size: 1.1rem;">Sales Analytics</h4>
            <div class="demo-db-filters">
              <button class="demo-filter-btn active" data-period="daily">Harian</button>
              <button class="demo-filter-btn" data-period="weekly">Mingguan</button>
              <button class="demo-filter-btn" data-period="monthly">Bulanan</button>
            </div>
          </div>
          <div class="demo-db-widgets">
            <div class="widget">
              <div class="widget-title">Total Omzet</div>
              <div class="widget-value" id="kpi-sales">Rp4.200.000</div>
            </div>
            <div class="widget">
              <div class="widget-title">Transaksi</div>
              <div class="widget-value" id="kpi-orders">182</div>
            </div>
            <div class="widget">
              <div class="widget-title">Ulasan Positif</div>
              <div class="widget-value">98.2%</div>
            </div>
          </div>
          <div class="demo-db-chart-box">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <div class="demo-db-bar" id="bar1" style="height: 40px; min-height: 10px;"></div>
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--muted-gray);">Sen</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <div class="demo-db-bar" id="bar2" style="height: 90px; min-height: 10px;"></div>
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--muted-gray);">Sel</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <div class="demo-db-bar" id="bar3" style="height: 130px; min-height: 10px;"></div>
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--muted-gray);">Rab</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <div class="demo-db-bar" id="bar4" style="height: 60px; min-height: 10px;"></div>
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--muted-gray);">Kam</span>
            </div>
          </div>
        `;

        const filterButtons = container.querySelectorAll('.demo-filter-btn');
        const kpiSales = container.querySelector('#kpi-sales');
        const kpiOrders = container.querySelector('#kpi-orders');
        const bar1 = container.querySelector('#bar1');
        const bar2 = container.querySelector('#bar2');
        const bar3 = container.querySelector('#bar3');
        const bar4 = container.querySelector('#bar4');

        const periods = {
          daily: { sales: "Rp4.200.000", orders: "182", heights: [40, 90, 130, 60] },
          weekly: { sales: "Rp28.500.000", orders: "1.240", heights: [120, 70, 150, 110] },
          monthly: { sales: "Rp118.900.000", orders: "5.192", heights: [80, 140, 90, 160] }
        };

        filterButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.getAttribute('data-period');
            const data = periods[period];

            kpiSales.textContent = data.sales;
            kpiOrders.textContent = data.orders;
            bar1.style.height = `${data.heights[0]}px`;
            bar2.style.height = `${data.heights[1]}px`;
            bar3.style.height = `${data.heights[2]}px`;
            bar4.style.height = `${data.heights[3]}px`;
          });
        });
      }
    },
    6: {
      tag: "Analisis Data",
      title: "Visualisasi Statistik Interaktif (Interactive Demo)",
      build: (container) => {
        container.innerHTML = `
          <div class="demo-stats-layout">
            <div class="demo-control-panel">
              <h5 style="color: var(--primary-navy); font-weight: 800; font-size: 1rem;">Ubah Variabel</h5>
              <div class="demo-control-group">
                <label>Kemiringan Hubungan (Korelasi):</label>
                <input type="range" id="slider-slope" min="-1" max="1" step="0.2" value="0.6">
              </div>
              <div class="demo-stats-results">
                <div><strong>Koefisien Korelasi (r):</strong> <span id="val-r">0.60</span></div>
                <div><strong>Koefisien Determinasi (R²):</strong> <span id="val-r2">0.36</span></div>
                <div><strong>Nilai p-value:</strong> <span id="val-p">&lt; 0.05 (Signifikan)</span></div>
              </div>
            </div>
            <div class="demo-plot-area">
              <svg viewBox="0 0 100 100" class="demo-stats-svg" id="stats-svg">
                <!-- Grid lines -->
                <line x1="10" y1="90" x2="90" y2="90" stroke="var(--border-soft)" stroke-width="0.5"></line>
                <line x1="10" y1="10" x2="10" y2="90" stroke="var(--border-soft)" stroke-width="0.5"></line>
                
                <!-- Regression Line -->
                <line id="trendline" x1="15" y1="70" x2="85" y2="30" stroke="var(--accent-orange)" stroke-width="1.5" stroke-linecap="round"></line>
                
                <!-- Scatter Points -->
                <circle cx="20" cy="72" r="2" fill="var(--primary-teal)"></circle>
                <circle cx="35" cy="55" r="2" fill="var(--primary-teal)"></circle>
                <circle cx="50" cy="50" r="2" fill="var(--primary-teal)"></circle>
                <circle cx="65" cy="40" r="2" fill="var(--primary-teal)"></circle>
                <circle cx="80" cy="28" r="2" fill="var(--primary-teal)"></circle>
              </svg>
            </div>
          </div>
        `;

        const slopeSlider = container.querySelector('#slider-slope');
        const valR = container.querySelector('#val-r');
        const valR2 = container.querySelector('#val-r2');
        const valP = container.querySelector('#val-p');
        const trendline = container.querySelector('#trendline');
        const points = container.querySelectorAll('#stats-svg circle');

        slopeSlider.addEventListener('input', () => {
          const slope = parseFloat(slopeSlider.value);
          
          // Calculate values
          valR.textContent = slope.toFixed(2);
          valR2.textContent = (slope * slope).toFixed(2);
          
          if (Math.abs(slope) >= 0.4) {
            valP.textContent = "< 0.05 (Signifikan)";
          } else {
            valP.textContent = "> 0.05 (Tidak Signifikan)";
          }

          // Adjust trendline endpoints based on slope
          // slope = 1 -> y1 = 80, y2 = 20
          // slope = -1 -> y1 = 20, y2 = 80
          // slope = 0 -> y1 = 50, y2 = 50
          const y1 = 50 + (slope * -30);
          const y2 = 50 - (slope * -30);

          trendline.setAttribute('y1', y1);
          trendline.setAttribute('y2', y2);

          // Update scatter point Y values with some randomized scatter offset
          const offsets = [4, -5, 2, -3, 5];
          points.forEach((pt, index) => {
            const x = parseFloat(pt.getAttribute('cx'));
            // linear interpolation for y base
            const progress = (x - 15) / 70; // 0 to 1
            const yBase = y1 + progress * (y2 - y1);
            const yFinal = Math.max(10, Math.min(90, yBase + offsets[index]));
            pt.setAttribute('cy', yFinal);
          });
        });
      }
    }
  };

  // Open modal handlers
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      const data = projectsData[id];
      if (data) {
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = ''; // Clear previous content
        data.build(modalBody);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main scroll
      }
    });
  });

  // Close modal handlers
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  };

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close modal on Esc key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});

