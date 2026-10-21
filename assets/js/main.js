/**
 * ==========================================================================
 * BrightPath Academy - Main JavaScript (main.js)
 * ES6+ Modular, Accessible, Production-Ready
 * ==========================================================================
 */

const BrightPath = (() => {
  'use strict';

  // State keys for LocalStorage
  const STORAGE_THEME = 'brightpath_theme';
  const STORAGE_RTL = 'brightpath_rtl';

  /**
   * 1. Theme Manager (Dark / Light Mode)
   * Automatic system preference detection + manual toggle with persistence
   */
  const initTheme = () => {
    const htmlEl = document.documentElement;
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    // Check saved preference or fallback to system preference
    const savedTheme = localStorage.getItem(STORAGE_THEME);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

    // Apply theme
    applyTheme(currentTheme);

    // Bind event listeners to all theme toggle buttons across pages/navbars
    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(activeTheme);
        localStorage.setItem(STORAGE_THEME, activeTheme);
        showToast(`Theme switched to ${activeTheme} mode`, 'info');
      });
    });

    // Listen to system changes if user hasn't explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_THEME)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  const applyTheme = (theme) => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-theme', theme);
    htmlEl.setAttribute('data-bs-theme', theme);

    // Update FontAwesome icon class fallbacks
    const icons = document.querySelectorAll('.theme-toggle-icon');
    icons.forEach(icon => {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun theme-toggle-icon text-warning';
      } else {
        icon.className = 'fa-solid fa-moon theme-toggle-icon';
      }
    });

    // Update SVG icon wrapper elements (Bulletproof rendering without font dependencies)
    const themeSvgs = document.querySelectorAll('.theme-toggle-svg-wrap');
    themeSvgs.forEach(wrap => {
      if (theme === 'dark') {
        wrap.innerHTML = `<svg class="bp-icon-svg text-warning" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
      } else {
        wrap.innerHTML = `<svg class="bp-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    });
  };

  /**
   * 2. RTL Layout Manager
   * Supports Arabic, Hebrew, and RTL testing
   */
  const initRTL = () => {
    const htmlEl = document.documentElement;
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    const savedRTL = localStorage.getItem(STORAGE_RTL);

    if (savedRTL === 'rtl') {
      htmlEl.setAttribute('dir', 'rtl');
      updateRTLButtons(true);
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      updateRTLButtons(false);
    }

    rtlToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isCurrentRTL = htmlEl.getAttribute('dir') === 'rtl';
        const newDir = isCurrentRTL ? 'ltr' : 'rtl';
        htmlEl.setAttribute('dir', newDir);
        localStorage.setItem(STORAGE_RTL, newDir);
        updateRTLButtons(!isCurrentRTL);
        showToast(`Layout switched to ${newDir.toUpperCase()}`, 'info');
      });
    });
  };

  const updateRTLButtons = (isRTL) => {
    const labels = document.querySelectorAll('.rtl-status-label');
    labels.forEach(lbl => {
      lbl.textContent = isRTL ? 'LTR' : 'RTL';
    });
  };

  /**
   * 3. Sticky Navbar with scroll elevation
   */
  const initNavbar = () => {
    const navbar = document.querySelector('.bp-navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  };

  /**
   * 4. Animated Counters for Stats
   */
  const initCounters = () => {
    const counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500;
            const start = 0;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = start;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current).toLocaleString();
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.bp-stats-strip');
    if (statsSection) observer.observe(statsSection);
  };

  /**
   * 5. Interactive Subject & Program Filtering
   */
  const initProgramFilter = () => {
    const filterBtns = document.querySelectorAll('.program-filter-btn');
    const programCards = document.querySelectorAll('.program-card-item');

    if (!filterBtns.length || !programCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'btn-bp-primary'));
        filterBtns.forEach(b => b.classList.add('btn-bp-outline'));
        
        btn.classList.add('active', 'btn-bp-primary');
        btn.classList.remove('btn-bp-outline');

        const filterValue = btn.getAttribute('data-filter');

        programCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  };

  /**
   * 6. Tutor Subject & Grade Filtering
   */
  const initTutorFilter = () => {
    const tutorFilterBtns = document.querySelectorAll('.tutor-filter-btn');
    const tutorCards = document.querySelectorAll('.tutor-card-item');

    if (!tutorFilterBtns.length || !tutorCards.length) return;

    tutorFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tutorFilterBtns.forEach(b => b.classList.remove('active', 'btn-bp-primary'));
        tutorFilterBtns.forEach(b => b.classList.add('btn-bp-outline'));

        btn.classList.add('active', 'btn-bp-primary');
        btn.classList.remove('btn-bp-outline');

        const filter = btn.getAttribute('data-filter');

        tutorCards.forEach(card => {
          const subjects = card.getAttribute('data-subjects') || '';
          if (filter === 'all' || subjects.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 20);
          } else {
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  };

  /**
   * 7. Accessible Form Validation
   */
  const initFormValidation = () => {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          showToast('Please check the required fields before submitting.', 'warning');
        } else {
          event.preventDefault();
          
          // Show simulated loading button state
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn ? submitBtn.innerHTML : '';
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
          }

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
            }
            form.reset();
            form.classList.remove('was-validated');
            showToast('Form submitted successfully! Our team will contact you shortly.', 'success');
            
            // If contact or modal, close modal if open
            const openModal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
            if (openModal) openModal.hide();
          }, 1200);
        }

        form.classList.add('was-validated');
      }, false);
    });
  };

  /**
   * 8. Skeleton Loader Handler
   * Simulates dynamic loading states smoothly
   */
  const initSkeletonSimulation = () => {
    const skeletonWrappers = document.querySelectorAll('[data-skeleton-wrapper]');
    if (!skeletonWrappers.length) return;

    skeletonWrappers.forEach(wrapper => {
      const skeletons = wrapper.querySelectorAll('.skeleton');
      const content = wrapper.querySelector('.skeleton-content');
      
      // Initially show skeletons, hide actual content
      if (skeletons.length && content) {
        content.classList.add('d-none');
        setTimeout(() => {
          skeletons.forEach(s => s.classList.add('d-none'));
          content.classList.remove('d-none');
          content.style.opacity = '0';
          content.style.transition = 'opacity 0.4s ease';
          setTimeout(() => {
            content.style.opacity = '1';
          }, 50);
        }, 600);
      }
    });
  };

  /**
   * 9. Toast Notification Generator (Bootstrap 5 Toast API)
   */
  const showToast = (message, type = 'info') => {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1090';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    let bgClass = 'bg-primary text-white';
    let iconClass = 'fa-circle-info';

    if (type === 'success') {
      bgClass = 'bg-success text-white';
      iconClass = 'fa-circle-check';
    } else if (type === 'warning') {
      bgClass = 'bg-warning text-dark';
      iconClass = 'fa-triangle-exclamation';
    } else if (type === 'danger' || type === 'error') {
      bgClass = 'bg-danger text-white';
      iconClass = 'fa-circle-xmark';
    }

    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastEl = document.getElementById(toastId);
    if (toastEl && window.bootstrap) {
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }
  };

  /**
   * 10. Interactive Program Details Modal Handler
   */
  const initProgramDetailsModal = () => {
    const modalEl = document.getElementById('programDetailsModal');
    if (!modalEl) return;

    modalEl.addEventListener('show.bs.modal', (event) => {
      const btn = event.relatedTarget;
      if (!btn) return;

      const title = btn.getAttribute('data-title') || 'Program Details';
      const category = btn.getAttribute('data-category') || '';
      const categoryIcon = btn.getAttribute('data-category-icon') || 'fa-bookmark';
      const badge = btn.getAttribute('data-badge') || '';
      const ratio = btn.getAttribute('data-ratio') || '';
      const days = btn.getAttribute('data-days') || '';
      const duration = btn.getAttribute('data-duration') || '';
      const price = btn.getAttribute('data-price') || '';
      const period = btn.getAttribute('data-period') || '/ month';
      const img = btn.getAttribute('data-img') || '';
      const desc = btn.getAttribute('data-desc') || '';
      const highlightsRaw = btn.getAttribute('data-highlights') || '';

      const modalTitleEl = document.getElementById('programDetailsModalLabel');
      const modalBadgeEl = document.getElementById('modalBadge');
      const modalRatioEl = document.getElementById('modalRatio');
      const modalCategoryEl = document.getElementById('modalCategory');
      const modalDescEl = document.getElementById('modalDesc');
      const modalDaysEl = document.getElementById('modalDays');
      const modalDurationEl = document.getElementById('modalDuration');
      const modalPriceEl = document.getElementById('modalPrice');
      const modalImgEl = document.getElementById('modalImg');
      const modalHighlightsEl = document.getElementById('modalHighlights');

      if (modalTitleEl) modalTitleEl.textContent = title;
      if (modalBadgeEl) modalBadgeEl.textContent = badge;
      if (modalRatioEl) modalRatioEl.innerHTML = `<i class="fa-solid fa-users me-1 text-primary"></i>${ratio}`;
      if (modalCategoryEl) modalCategoryEl.innerHTML = `<i class="fa-solid ${categoryIcon} me-1"></i> ${category}`;
      if (modalDescEl) modalDescEl.textContent = desc;
      if (modalDaysEl) modalDaysEl.textContent = days;
      if (modalDurationEl) modalDurationEl.textContent = duration;
      if (modalPriceEl) modalPriceEl.innerHTML = `${price} <small class="text-muted fw-normal">${period}</small>`;
      if (modalImgEl) {
        modalImgEl.src = img;
        modalImgEl.alt = title;
      }

      if (modalHighlightsEl) {
        const items = highlightsRaw ? highlightsRaw.split('|') : [];
        modalHighlightsEl.innerHTML = items.map(item => `
          <div class="col-sm-6">
            <div class="d-flex align-items-start gap-2 small text-muted">
              <i class="fa-solid fa-check text-success mt-1"></i>
              <span>${item.trim()}</span>
            </div>
          </div>
        `).join('');
      }
    });
  };

  /**
   * Public API
   */
  const init = () => {
    initTheme();
    initRTL();
    initNavbar();
    initCounters();
    initProgramFilter();
    initTutorFilter();
    initFormValidation();
    initSkeletonSimulation();
    initProgramDetailsModal();
  };

  // Expose to window
  return {
    init,
    showToast,
    applyTheme
  };
})();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  BrightPath.init();
});
