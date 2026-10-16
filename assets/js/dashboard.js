/**
 * ==========================================================================
 * BrightPath Academy - Parent Dashboard JavaScript (dashboard.js)
 * Handles: Session Slot Booking, Homework Notes Tracking, Attendance History
 * ==========================================================================
 */

const ParentDashboard = (() => {
  'use strict';

  // Demo Children Data
  const childrenData = {
    'child-1': {
      id: 'child-1',
      name: 'Leo Miller',
      grade: '4th Grade',
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80',
      attendanceRate: '98%',
      completedHW: 24,
      pendingHW: 1,
      totalHours: 36,
      upcomingSessions: [
        { id: 101, subject: 'Homework Help & Math Lab', tutor: 'Marcus Vance', date: 'Today, Oct 15', time: '3:30 PM - 4:30 PM', room: 'Study Pod B', status: 'Confirmed' },
        { id: 102, subject: 'STEM & Robotics Enrichment', tutor: 'David Chen', date: 'Tomorrow, Oct 16', time: '4:30 PM - 5:30 PM', room: 'Innovation Lab', status: 'Confirmed' },
        { id: 103, subject: 'Reading Comprehension Club', tutor: 'Elena Rostova', date: 'Thu, Oct 18', time: '3:30 PM - 4:30 PM', room: 'Library Corner', status: 'Confirmed' }
      ],
      homeworkNotes: [
        {
          id: 'hw-1',
          date: 'Yesterday, Oct 14',
          subject: 'Mathematics',
          topic: 'Multi-digit Multiplication & Word Problems',
          status: 'Completed',
          tutor: 'Marcus Vance',
          notes: 'Leo completed all 12 worksheet problems with 92% accuracy. He showed great mastery in regrouping. Reviewed 2 word problems together.',
          needsAction: false,
          attachment: 'Math_Worksheet_Multiplication_Oct14.pdf',
          parentAcknowledged: true
        },
        {
          id: 'hw-2',
          date: 'Oct 12, 2026',
          subject: 'Science',
          topic: 'Solar System Planetary Orbits Diagram',
          status: 'Completed',
          tutor: 'Dr. Sarah Jenkins',
          notes: 'Diagram colored and labeled accurately. Leo participated actively in the scale model exercise.',
          needsAction: false,
          attachment: 'Planets_Lab_Sheet.pdf',
          parentAcknowledged: true
        },
        {
          id: 'hw-3',
          date: 'Oct 10, 2026',
          subject: 'English Language Arts',
          topic: 'Book Summary: Charlotte\'s Web Chapters 4-6',
          status: 'Needs Follow-Up',
          tutor: 'Elena Rostova',
          notes: 'Leo made a great start on his character analysis. He needs 15 more minutes tonight to finish the concluding paragraph.',
          needsAction: true,
          attachment: 'Reading_Log_Draft.pdf',
          parentAcknowledged: false
        }
      ],
      attendance: [
        { date: 'Oct 15, 2026', program: 'After-School Homework Lab', checkIn: '3:25 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Arrived on bus #12' },
        { date: 'Oct 14, 2026', program: 'Math Mastery & Homework', checkIn: '3:30 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Completed all assignments' },
        { date: 'Oct 13, 2026', program: 'Enrichment Science Lab', checkIn: '3:40 PM', checkOut: '5:30 PM', status: 'Late', notes: 'Parent notified delay in traffic' },
        { date: 'Oct 10, 2026', program: 'Reading & Language Arts', checkIn: '3:28 PM', checkOut: '5:30 PM', status: 'Present', notes: 'On-time' },
        { date: 'Oct 09, 2026', program: 'Friday Creative Arts Lab', checkIn: '—', checkOut: '—', status: 'Excused', notes: 'Family dentist appointment' },
        { date: 'Oct 08, 2026', program: 'After-School Homework Lab', checkIn: '3:27 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Great focus during study hall' }
      ]
    },
    'child-2': {
      id: 'child-2',
      name: 'Maya Miller',
      grade: '7th Grade',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      attendanceRate: '95%',
      completedHW: 31,
      pendingHW: 0,
      totalHours: 42,
      upcomingSessions: [
        { id: 201, subject: 'Pre-Algebra & Geometry Support', tutor: 'Marcus Vance', date: 'Today, Oct 15', time: '4:30 PM - 5:30 PM', room: 'Study Pod A', status: 'Confirmed' },
        { id: 202, subject: 'Coding with Python & Web Tech', tutor: 'David Chen', date: 'Fri, Oct 17', time: '4:00 PM - 5:30 PM', room: 'Tech Lab 2', status: 'Confirmed' }
      ],
      homeworkNotes: [
        {
          id: 'hw-201',
          date: 'Yesterday, Oct 14',
          subject: 'Pre-Algebra',
          topic: 'Linear Equations with Variables on Both Sides',
          status: 'Completed',
          tutor: 'Marcus Vance',
          notes: 'Maya tackled advanced algebraic balance equations with ease. Encouraged her to try the bonus challenge problems.',
          needsAction: false,
          attachment: 'Algebra_ProblemSet_4.pdf',
          parentAcknowledged: true
        },
        {
          id: 'hw-202',
          date: 'Oct 11, 2026',
          subject: 'Earth Science',
          topic: 'Tectonic Plates & Earthquake Analysis',
          status: 'Completed',
          tutor: 'Dr. Sarah Jenkins',
          notes: 'Maya finished her research poster ahead of time. Excellent initiative citing primary geological survey data.',
          needsAction: false,
          attachment: 'Earthquake_Report_Draft.pdf',
          parentAcknowledged: true
        }
      ],
      attendance: [
        { date: 'Oct 15, 2026', program: 'Middle School Study Lounge', checkIn: '3:30 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Joined algebra group' },
        { date: 'Oct 14, 2026', program: 'STEM Lab & Homework', checkIn: '3:32 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Python project review' },
        { date: 'Oct 12, 2026', program: 'After-School Study Hall', checkIn: '3:30 PM', checkOut: '5:30 PM', status: 'Present', notes: 'Prepared for history exam' }
      ]
    }
  };

  let activeChildId = 'child-1';

  /**
   * 1. Initialize Child Selector
   */
  const initChildSelector = () => {
    const childSelectEl = document.getElementById('dashChildSelector');
    if (!childSelectEl) return;

    childSelectEl.addEventListener('change', (e) => {
      activeChildId = e.target.value;
      renderActiveChild();
      BrightPath.showToast(`Switched view to ${childrenData[activeChildId].name}`, 'info');
    });
  };

  /**
   * Render All Panels for Active Child
   */
  const renderActiveChild = () => {
    const child = childrenData[activeChildId];
    if (!child) return;

    // Update Header Avatar & Stats
    const avatarEl = document.getElementById('dashChildAvatar');
    const nameEl = document.getElementById('dashChildName');
    const gradeEl = document.getElementById('dashChildGrade');
    const attendanceEl = document.getElementById('dashStatAttendance');
    const completedHWEl = document.getElementById('dashStatCompletedHW');
    const hoursEl = document.getElementById('dashStatHours');

    if (avatarEl) avatarEl.src = child.avatar;
    if (nameEl) nameEl.textContent = child.name;
    if (gradeEl) gradeEl.textContent = child.grade;
    if (attendanceEl) attendanceEl.textContent = child.attendanceRate;
    if (completedHWEl) completedHWEl.textContent = child.completedHW;
    if (hoursEl) hoursEl.textContent = child.totalHours + ' hrs';

    // Render Sub-sections
    renderUpcomingSessions();
    renderHomeworkNotes();
    renderAttendanceTable();
  };

  /**
   * 2. Render Upcoming Booked Sessions
   */
  const renderUpcomingSessions = () => {
    const container = document.getElementById('upcomingSessionsContainer');
    if (!container) return;

    const sessions = childrenData[activeChildId].upcomingSessions;

    if (!sessions.length) {
      container.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="fa-solid fa-calendar-xmark fa-2x mb-2 text-secondary opacity-50"></i>
          <p class="mb-0">No upcoming sessions booked for this week.</p>
        </div>
      `;
      return;
    }

    let html = '';
    sessions.forEach(sess => {
      html += `
        <div class="bp-hw-item d-flex flex-wrap justify-content-between align-items-center gap-3" id="session-card-${sess.id}">
          <div class="d-flex align-items-center gap-3">
            <div class="bp-icon-box bp-icon-box-primary mb-0 flex-shrink-0" style="width: 44px; height: 44px; font-size: 1.1rem;">
              <i class="fa-solid fa-clock"></i>
            </div>
            <div>
              <h6 class="mb-1 font-heading">${sess.subject}</h6>
              <div class="small text-muted d-flex flex-wrap gap-2 align-items-center">
                <span><i class="fa-solid fa-calendar-day me-1 text-primary"></i>${sess.date}</span>
                <span>•</span>
                <span><i class="fa-solid fa-hourglass-half me-1 text-primary"></i>${sess.time}</span>
                <span>•</span>
                <span><i class="fa-solid fa-user-tie me-1 text-primary"></i>${sess.tutor}</span>
                <span>•</span>
                <span class="badge bg-light text-dark border">${sess.room}</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="fa-solid fa-circle-check me-1"></i>${sess.status}</span>
            <button class="btn btn-sm btn-outline-danger cancel-session-btn" data-id="${sess.id}" aria-label="Cancel session ${sess.subject}">
              <i class="fa-solid fa-xmark"></i> Cancel
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach cancel listeners
    container.querySelectorAll('.cancel-session-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sessId = parseInt(btn.getAttribute('data-id'));
        cancelSession(sessId);
      });
    });
  };

  const cancelSession = (sessId) => {
    if (confirm('Are you sure you want to cancel this after-school session slot?')) {
      const child = childrenData[activeChildId];
      child.upcomingSessions = child.upcomingSessions.filter(s => s.id !== sessId);
      renderUpcomingSessions();
      BrightPath.showToast('Session slot cancelled successfully.', 'warning');
    }
  };

  /**
   * 3. Interactive Slot Booking System
   */
  const initBookingForm = () => {
    const bookingForm = document.getElementById('slotBookingForm');
    const slotBtns = document.querySelectorAll('.bp-slot-btn');
    let selectedSlot = '3:30 PM - 4:15 PM';

    slotBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        slotBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSlot = btn.getAttribute('data-slot');
      });
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const subjectSelect = document.getElementById('bookSubject');
        const tutorSelect = document.getElementById('bookTutor');
        const dateInput = document.getElementById('bookDate');
        const notesInput = document.getElementById('bookNotes');

        const newSession = {
          id: Date.now(),
          subject: subjectSelect ? subjectSelect.value : 'Homework Support Lab',
          tutor: tutorSelect ? tutorSelect.value : 'Assigned Lead Tutor',
          date: dateInput && dateInput.value ? dateInput.value : 'Upcoming Scheduled Day',
          time: selectedSlot,
          room: 'Enrichment Hub 3',
          status: 'Confirmed'
        };

        // Add to child's session list
        childrenData[activeChildId].upcomingSessions.unshift(newSession);
        renderUpcomingSessions();

        // Close modal if open
        const modalEl = document.getElementById('bookSessionModal');
        if (modalEl && window.bootstrap) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        }

        BrightPath.showToast(`Success! Session booked for ${childrenData[activeChildId].name} on ${newSession.date} at ${newSession.time}`, 'success');
        bookingForm.reset();
      });
    }
  };

  /**
   * 4. Homework Completion Notes Tracker & Search/Filter
   */
  const renderHomeworkNotes = (filterSubject = 'all', searchQuery = '') => {
    const container = document.getElementById('homeworkNotesContainer');
    if (!container) return;

    let notes = childrenData[activeChildId].homeworkNotes;

    // Apply subject filter
    if (filterSubject !== 'all') {
      notes = notes.filter(n => n.subject.toLowerCase() === filterSubject.toLowerCase());
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      notes = notes.filter(n => n.topic.toLowerCase().includes(q) || n.notes.toLowerCase().includes(q) || n.tutor.toLowerCase().includes(q));
    }

    if (!notes.length) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="fa-solid fa-clipboard-question fa-2x mb-3 text-secondary opacity-50"></i>
          <h6>No homework notes found</h6>
          <p class="small">Try adjusting your filter or search keywords.</p>
        </div>
      `;
      return;
    }

    let html = '';
    notes.forEach(hw => {
      const isCompleted = hw.status === 'Completed';
      const statusBadge = isCompleted 
        ? `<span class="bp-hw-status-pill bg-success-subtle text-success border border-success-subtle"><i class="fa-solid fa-check me-1"></i>Completed & Verified</span>`
        : `<span class="bp-hw-status-pill bg-warning-subtle text-warning border border-warning-subtle"><i class="fa-solid fa-triangle-exclamation me-1"></i>Action Needed</span>`;

      const parentStatus = hw.parentAcknowledged
        ? `<span class="small text-success"><i class="fa-solid fa-check-double me-1"></i>Acknowledged by Parent</span>`
        : `<button class="btn btn-sm btn-outline-primary ack-btn" data-hwid="${hw.id}"><i class="fa-regular fa-square-check me-1"></i>Acknowledge Note</button>`;

      html += `
        <div class="bp-hw-item" id="hw-card-${hw.id}">
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary-subtle text-primary fw-semibold">${hw.subject}</span>
              <span class="text-muted small">•</span>
              <span class="small text-muted"><i class="fa-solid fa-calendar me-1"></i>${hw.date}</span>
            </div>
            <div>${statusBadge}</div>
          </div>
          <h5 class="font-heading fs-6 mb-2">${hw.topic}</h5>
          <p class="mb-3 text-muted small" style="line-height: 1.5;">${hw.notes}</p>
          
          <div class="d-flex flex-wrap justify-content-between align-items-center pt-2 border-top border-light-subtle gap-2">
            <div class="small text-muted d-flex align-items-center gap-2">
              <i class="fa-solid fa-chalkboard-user text-primary"></i>
              <span>Tutor: <strong>${hw.tutor}</strong></span>
              ${hw.attachment ? `<span class="badge bg-light text-muted border"><i class="fa-solid fa-paperclip me-1"></i>${hw.attachment}</span>` : ''}
            </div>
            <div class="ack-action-container">${parentStatus}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach acknowledge handlers
    container.querySelectorAll('.ack-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hwId = btn.getAttribute('data-hwid');
        const targetHW = childrenData[activeChildId].homeworkNotes.find(n => n.id === hwId);
        if (targetHW) {
          targetHW.parentAcknowledged = true;
          renderHomeworkNotes(filterSubject, searchQuery);
          BrightPath.showToast(`Homework note acknowledged for ${targetHW.subject}!`, 'success');
        }
      });
    });
  };

  /**
   * 5. Homework Filter & Search Listeners
   */
  const initHomeworkFilters = () => {
    const subjectFilter = document.getElementById('hwSubjectFilter');
    const searchInput = document.getElementById('hwSearchInput');

    if (subjectFilter) {
      subjectFilter.addEventListener('change', () => {
        const query = searchInput ? searchInput.value : '';
        renderHomeworkNotes(subjectFilter.value, query);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const filter = subjectFilter ? subjectFilter.value : 'all';
        renderHomeworkNotes(filter, searchInput.value);
      });
    }
  };

  /**
   * 6. Attendance History Log & Export Simulation
   */
  const renderAttendanceTable = (statusFilter = 'all') => {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;

    let records = childrenData[activeChildId].attendance;

    if (statusFilter !== 'all') {
      records = records.filter(r => r.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (!records.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">No attendance logs found for this filter.</td>
        </tr>
      `;
      return;
    }

    let rows = '';
    records.forEach(rec => {
      let badgeClass = 'bp-attendance-present';
      let icon = 'fa-circle-check';
      if (rec.status === 'Late') {
        badgeClass = 'bp-attendance-late';
        icon = 'fa-clock';
      } else if (rec.status === 'Excused') {
        badgeClass = 'bp-attendance-excused';
        icon = 'fa-user-clock';
      }

      rows += `
        <tr>
          <td class="fw-semibold">${rec.date}</td>
          <td>${rec.program}</td>
          <td>${rec.checkIn}</td>
          <td>${rec.checkOut}</td>
          <td>
            <span class="bp-attendance-badge ${badgeClass}">
              <i class="fa-solid ${icon}"></i> ${rec.status}
            </span>
          </td>
          <td class="small text-muted">${rec.notes}</td>
        </tr>
      `;
    });

    tbody.innerHTML = rows;
  };

  /**
   * Attendance Filters & CSV Export
   */
  const initAttendanceActions = () => {
    const filterSelect = document.getElementById('attendanceStatusFilter');
    const exportBtn = document.getElementById('exportAttendanceBtn');

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        renderAttendanceTable(e.target.value);
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const records = childrenData[activeChildId].attendance;
        let csvContent = "data:text/csv;charset=utf-8,Date,Program,Check In,Check Out,Status,Notes\n";
        records.forEach(r => {
          csvContent += `"${r.date}","${r.program}","${r.checkIn}","${r.checkOut}","${r.status}","${r.notes}"\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `attendance_${childrenData[activeChildId].name.replace(/\s+/g, '_')}_records.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        BrightPath.showToast('Attendance report CSV downloaded successfully!', 'success');
      });
    }
  };

  /**
   * Public Initializer
   */
  const init = () => {
    initChildSelector();
    initBookingForm();
    initHomeworkFilters();
    initAttendanceActions();
    renderActiveChild();
  };

  return {
    init
  };
})();

// Auto initialize if on dashboard page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dashChildSelector')) {
    ParentDashboard.init();
  }
});
