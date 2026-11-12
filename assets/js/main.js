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
   * 3. Sticky Navbar with scroll elevation, active link resolution & mobile drawer handling
   */
  const initNavbar = () => {
    const navbar = document.querySelector('.bp-navbar');
    if (!navbar) return;

    // Scroll Elevation Handler
    const handleScroll = () => {
      if (window.scrollY > 15) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Active Navigation Link Auto-Detection
    const navLinks = navbar.querySelectorAll('.bp-nav-link');
    if (navLinks.length > 0) {
      const rawPath = window.location.pathname.split('/').pop().toLowerCase();
      const currentPage = rawPath || 'index.html';

      let activeTarget = null;
      if (currentPage === 'index.html' || currentPage === 'home-2.html' || currentPage === '') {
        activeTarget = 'index.html';
      } else if (
        currentPage === 'programs.html' ||
        currentPage.startsWith('program-') ||
        currentPage === 'homework-tutoring.html' ||
        currentPage === 'academic-enrichment.html' ||
        currentPage === 'enrichment-clubs.html' ||
        currentPage === 'seasonal-camps.html' ||
        currentPage === 'services.html'
      ) {
        activeTarget = 'programs.html';
      } else if (currentPage === 'tutors.html') {
        activeTarget = 'tutors.html';
      } else if (currentPage === 'blog.html' || currentPage.startsWith('blog-detail')) {
        activeTarget = 'blog.html';
      } else if (currentPage === 'contact.html') {
        activeTarget = 'contact.html';
      } else if (currentPage === 'dashboard.html' || currentPage === 'login.html' || currentPage === 'register.html') {
        activeTarget = 'dashboard.html';
      }

      if (activeTarget) {
        navLinks.forEach(link => {
          const href = (link.getAttribute('href') || '').toLowerCase();
          if (href === activeTarget) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    }

    // Auto-close mobile collapse upon clicking any nav link
    const collapseEl = navbar.querySelector('.navbar-collapse');
    if (collapseEl && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
      const allCollapseLinks = collapseEl.querySelectorAll('a:not(.dropdown-toggle)');
      allCollapseLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992 && collapseEl.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
            bsCollapse.hide();
          }
        });
      });
    }
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
   * 7. Accessible Form Validation & Strict Input Sanitization
   */
  const initFormValidation = () => {
    const nameRegex = /^[A-Za-z\u00C0-\u00FF\s'\-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    // Helper to update field feedback and state
    const setFieldState = (field, isValid, message = '') => {
      if (!field) return;
      const parent = field.closest('.col-md-6, .col-12, .mb-3, .form-group') || field.parentElement;
      let feedback = parent ? parent.querySelector('.invalid-feedback') : null;
      if (isValid) {
        field.setCustomValidity('');
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      } else {
        field.setCustomValidity(message || 'Please provide a valid entry.');
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        if (feedback && message) {
          feedback.textContent = message;
        }
      }
    };
    // 1. Name validation helper
    const validateNameField = (input, isBlur = false) => {
      const val = input.value.trim();
      const isRequired = input.required;
      if (!val) {
        if (isRequired && isBlur) {
          setFieldState(input, false, 'This name field is required.');
          return false;
        }
        if (!isRequired) {
          input.classList.remove('is-valid', 'is-invalid');
          input.setCustomValidity('');
          return true;
        }
        return false;
      }
      if (/[0-9]/.test(val)) {
        setFieldState(input, false, 'Names cannot contain numbers.');
        return false;
      }
      if (val.length < 2) {
        setFieldState(input, false, 'Please enter at least 2 letters.');
        return false;
      }
      if (!nameRegex.test(val)) {
        setFieldState(input, false, 'Please use letters, spaces, hyphens, or apostrophes only.');
        return false;
      }
      setFieldState(input, true);
      return true;
    };
    // 2. Phone validation helper
    const validatePhoneField = (input, isBlur = false) => {
      const cleanDigits = input.value.replace(/\D/g, '');
      const isRequired = input.required;
      if (!cleanDigits) {
        if (isRequired && isBlur) {
          setFieldState(input, false, 'Mobile phone number is required.');
          return false;
        }
        if (!isRequired) {
          input.classList.remove('is-valid', 'is-invalid');
          input.setCustomValidity('');
          return true;
        }
        return false;
      }
      if (cleanDigits.length !== 10 && !(cleanDigits.length === 11 && cleanDigits.startsWith('1'))) {
        if (isBlur || cleanDigits.length > 10) {
          setFieldState(input, false, 'Please enter a valid 10-digit phone number.');
        }
        return false;
      }
      setFieldState(input, true);
      return true;
    };
    // 3. Select validation helper
    const validateSelectField = (select, isBlur = false) => {
      const val = select.value;
      const isRequired = select.required;
      if (!val || val === '') {
        if (isRequired && (isBlur || select.form?.classList.contains('was-validated'))) {
          setFieldState(select, false, 'Please select an option.');
          return false;
        }
        return !isRequired;
      }
      setFieldState(select, true);
      return true;
    };
    // 4. Email validation helper
    const validateEmailField = (input, isBlur = false) => {
      const val = input.value.trim();
      const isRequired = input.required;
      if (!val) {
        if (isRequired && isBlur) {
          setFieldState(input, false, 'Email address is required.');
          return false;
        }
        if (!isRequired) {
          input.classList.remove('is-valid', 'is-invalid');
          input.setCustomValidity('');
          return true;
        }
        return false;
      }
      if (!emailRegex.test(val)) {
        if (isBlur || val.includes('@')) {
          setFieldState(input, false, 'Please enter a valid email address (e.g. parent@example.com).');
        }
        return false;
      }
      setFieldState(input, true);
      return true;
    };
    // Attach to Name Inputs
    const nameInputs = document.querySelectorAll(
      'input[data-type="name"], #regParentFirstName, #regParentLastName, #regStudentName, #contactParentName, #trialParentName, #trialStudentName, #assessParentName, #assessStudentName'
    );
    nameInputs.forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(e.key)) return;
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          showToast('Name fields cannot accept numbers.', 'warning');
        }
      });
      input.addEventListener('input', () => {
        if (/[0-9]/.test(input.value)) {
          input.value = input.value.replace(/[0-9]/g, '');
          showToast('Numbers are not permitted in name fields.', 'warning');
        }
        if (input.classList.contains('is-invalid') || input.form?.classList.contains('was-validated') || input.value.trim().length >= 2) {
          validateNameField(input, false);
        }
      });
      input.addEventListener('blur', () => {
        validateNameField(input, true);
      });
    });
    // Attach to Phone Inputs
    const phoneInputs = document.querySelectorAll(
      'input[type="tel"], input[data-type="phone"], #regParentPhone, #contactPhone, #trialPhone, #assessPhone'
    );
    phoneInputs.forEach(input => {
      input.addEventListener('input', () => {
        const digits = input.value.replace(/\D/g, '');
        if (digits.length > 10) {
          input.value = digits.replace(/^1?(\d{3})(\d{3})(\d{4}).*$/, '($1) $2-$3');
        } else if (digits.length >= 7) {
          input.value = digits.replace(/^(\d{3})(\d{3})(\d{0,4})$/, '($1) $2-$3');
        } else if (digits.length >= 4) {
          input.value = digits.replace(/^(\d{3})(\d{0,3})$/, '($1) $2');
        }
        const cleanDigits = input.value.replace(/\D/g, '');
        if (cleanDigits.length === 10 || input.classList.contains('is-invalid') || input.form?.classList.contains('was-validated')) {
          validatePhoneField(input, false);
        }
      });
      input.addEventListener('blur', () => {
        validatePhoneField(input, true);
      });
    });
    // Attach to Email Inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') || input.form?.classList.contains('was-validated')) {
          validateEmailField(input, false);
        }
      });
      input.addEventListener('blur', () => {
        validateEmailField(input, true);
      });
    });
    // Attach to Select Inputs in all forms
    const selectInputs = document.querySelectorAll('.needs-validation select');
    selectInputs.forEach(select => {
      select.addEventListener('change', () => {
        validateSelectField(select, false);
      });
      select.addEventListener('blur', () => {
        validateSelectField(select, true);
      });
    });
    // 5. Accessible Form Submission
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        // Run full validation check across all fields in this form
        let isFormValid = true;
        // Check names
        form.querySelectorAll('input[data-type="name"], #regParentFirstName, #regParentLastName, #regStudentName, #contactParentName, #trialParentName, #trialStudentName, #assessParentName, #assessStudentName').forEach(input => {
          if (!validateNameField(input, true)) isFormValid = false;
        });
        // Check phones
        form.querySelectorAll('input[type="tel"], input[data-type="phone"], #regParentPhone, #contactPhone, #trialPhone, #assessPhone').forEach(input => {
          if (!validatePhoneField(input, true)) isFormValid = false;
        });
        // Check emails
        form.querySelectorAll('input[type="email"]').forEach(input => {
          if (!validateEmailField(input, true)) isFormValid = false;
        });
        // Check selects
        form.querySelectorAll('select').forEach(select => {
          if (!validateSelectField(select, true)) isFormValid = false;
        });
        // Check other required inputs (text, password, etc.)
        form.querySelectorAll('input:not([data-type="name"]):not([type="tel"]):not([type="email"]), textarea').forEach(ctrl => {
          if (ctrl.required && !ctrl.value.trim()) {
            setFieldState(ctrl, false, 'This field is required.');
            isFormValid = false;
          } else if (ctrl.checkValidity && !ctrl.checkValidity()) {
            setFieldState(ctrl, false, ctrl.validationMessage || 'Please provide a valid entry.');
            isFormValid = false;
          } else if (ctrl.value.trim()) {
            setFieldState(ctrl, true);
          }
        });
        if (!isFormValid || !form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          // Focus first invalid element smoothly
          const firstInvalid = form.querySelector('.is-invalid, :invalid');
          if (firstInvalid) {
            firstInvalid.focus();
            if (firstInvalid.scrollIntoView) {
              firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          showToast('Please complete all required fields correctly before submitting.', 'warning');
          return;
        }
        form.classList.add('was-validated');
        // Show simulated loading button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Confirming Trial Slot...';
        }
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          // Handle registration form redirection to dashboard
          if (form.id === 'enrollmentForm' || form.getAttribute('action') === 'dashboard.html') {
            showToast('Enrollment complete! Welcome to BrightPath Academy. Opening Parent Dashboard...', 'success');
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 800);
            return;
          }
          // Handle trial booking modal
          if (form.id === 'trialBookingForm' || form.closest('#trialBookingModal') || form.id === 'assessmentBookingForm') {
            showToast('Trial session reserved! A coordinator will text you confirmation within 1 hour.', 'success');
            const openModal = bootstrap.Modal.getInstance(document.getElementById('trialBookingModal'));
            if (openModal) openModal.hide();
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
            return;
          }
          // Handle slot booking on dashboard
          if (form.id === 'slotBookingForm' || form.closest('#bookSessionModal')) {
            showToast('After-school study slot successfully booked for Leo!', 'success');
            const modalEl = document.getElementById('bookSessionModal');
            if (modalEl) {
              const modal = bootstrap.Modal.getInstance(modalEl);
              if (modal) modal.hide();
            }
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
            return;
          }
          // Handle contact form
          if (form.id === 'contactForm') {
            showToast('Inquiry sent! Our admissions team will respond within 24 business hours.', 'success');
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
            return;
          }
          // General form / newsletter
          form.reset();
          form.classList.remove('was-validated');
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
          showToast('Thank you! Your information has been securely received.', 'success');
          const openModal = bootstrap.Modal.getInstance(document.querySelector('.modal.show'));
          if (openModal) openModal.hide();
        }, 700);
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
   * 10. Hero Classroom Video Controls
   * Autoplay fallback and click-to-pause/play toggle
   */
  const initHeroVideo = () => {
    const video = document.getElementById('heroClassroomVideo');
    if (!video) return;

    // Guarantee muted autoplay
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Will start on first user interaction if blocked by policy
      });
    }

    // Toggle play / pause on click
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    const playPauseBtn = document.getElementById('heroVideoPlayPauseBtn');
    const muteBtn = document.getElementById('heroVideoMuteBtn');

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          video.play();
          playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          playPauseBtn.setAttribute('title', 'Pause video');
          playPauseBtn.setAttribute('aria-label', 'Pause video');
        } else {
          video.pause();
          playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
          playPauseBtn.setAttribute('title', 'Play video');
          playPauseBtn.setAttribute('aria-label', 'Play video');
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
          muteBtn.setAttribute('title', 'Unmute audio');
          muteBtn.setAttribute('aria-label', 'Unmute audio');
        } else {
          muteBtn.innerHTML = '<i class="fa-solid fa-volume-high text-warning"></i>';
          muteBtn.setAttribute('title', 'Mute audio');
          muteBtn.setAttribute('aria-label', 'Mute audio');
        }
      });
    }
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
    initHeroVideo();
  };

  // Expose to window
  return {
    init,
    showToast,
    applyTheme
  };
})();

// Initialize on DOM Ready or immediately if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    BrightPath.init();
  });
} else {
  BrightPath.init();
}
