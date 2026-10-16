# BrightPath Academy — After-School Homework Help & Enrichment Center HTML Template

A modern, accessible, and structured responsive HTML5, CSS3, JavaScript, and Bootstrap 5 template designed specifically for after-school homework centers, tutoring academies, and STEM enrichment learning hubs.

---

## 🌟 Key Features

### 1. Academic & Support Focus
- **Home Page**: Highlights structured afternoon routines, academic support pillars, quick stats counters, verified tutor highlights, parent testimonials, and a complimentary trial session booking modal.
- **Programs Organized by Subject**: Dedicated pages showcasing Math Mastery, Language Arts & Reading Fluency, Hands-on STEM & Robotics, Young Investigators Science Lab, and Study Skills coaching with interactive subject filter tabs.
- **Certified Tutors Directory**: Certified educators with degrees, background-check verification badges, parent ratings, subjects taught, and interactive bio modals.
- **Sign In Portal (`pages/login.html`)**: Clean tabbed Parent and Student sign-in interface with 1-click demo account auto-fill, password visibility toggle, and forgot-password modal.
- **Student Enrollment & Registration (`pages/register.html`)**: Multi-step admission form for parents, grade level selection, allergies/notes, and payment checkout placeholder.

### 2. Interactive Parent Dashboard (`pages/dashboard.html`)
- **Student Switcher**: Easily toggle between enrolled siblings (e.g., Leo Miller - 4th Grade vs. Maya Miller - 7th Grade).
- **Session Slot Booking System**: Dynamic date selection, subject picker, tutor selector, interactive time slot buttons (3:30 PM, 4:15 PM, 5:00 PM, 5:45 PM), and instant schedule updates with toast notifications.
- **Homework Completion Notes Tracker**: Live search by keyword, subject filtering, tutor verification stamps, worksheet attachments, and an interactive "Acknowledge Note" action button for parents.
- **Attendance History Log**: Detailed log with date, check-in, check-out, and status indicators (`Present`, `Late`, `Excused Absence`) with a 1-click **Export CSV** download feature.

### 3. UI/UX & Technical Excellence
- **Dark / Light Mode**: Automatically detects system preference (`prefers-color-scheme: dark`) with manual sun/moon toggle button and `localStorage` persistence.
- **Right-To-Left (RTL) Compatibility**: Full layout mirroring via `assets/css/rtl.css` for Arabic and Hebrew languages.
- **WCAG 2.1 AA Accessibility**: High-contrast color palette, skip-to-content links, visible `:focus-visible` outlines, semantic heading hierarchy, and ARIA labels.
- **Skeleton Loading States**: Smooth animated shimmer loaders for cards, stats, and dashboard tables.
- **Responsive Breakpoints**:
  - Mobile: `< 640px` (Touch-friendly 44px+ targets, streamlined mobile navigation)
  - Tablet: `640px – 1024px`
  - Desktop: `1024px – 1280px`
  - Large: `> 1280px`
- **Zero Image Repetition**: Hand-curated, high-resolution educational photography from Unsplash, with zero repeated images across the entire website.

---

## 📁 File Structure

```text
Tuition center/
├── assets/
│   ├── css/
│   │   ├── style.css             # Main stylesheet & CSS variables
│   │   ├── dark-mode.css         # Dark mode color overrides
│   │   └── rtl.css               # Right-to-Left language layout mirroring
│   ├── js/
│   │   ├── main.js               # Theme, RTL, counters, filters & toasts
│   │   └── dashboard.js          # Parent dashboard interactivity & CSV export
│   ├── images/                   # Local image directory placeholder
│   └── fonts/                    # Font directory placeholder
├── pages/
│   ├── index.html                # Home page with academic support & trial modal
│   ├── about.html                # Mission, safety protocols, facility photo tour
│   ├── programs.html             # Academic curriculum organized by subject
│   ├── services.html             # Care packages, weekend bootcamps & 1-on-1 tutoring
│   ├── tutors.html               # Certified educators directory & bios
│   ├── login.html                # Parent & Student Sign In portal
│   ├── register.html             # Student enrollment registration form
│   ├── dashboard.html            # Parent Dashboard (Booking, notes, attendance)
│   ├── blog.html                 # Homework tips & parenting resources
│   └── contact.html              # Contact form, Google map, tour scheduling
├── documentation/
│   └── index.html                # Interactive documentation manual
├── index.html                    # Root entry redirecting to pages/index.html
├── robots.txt                    # Search crawler configuration
├── sitemap.xml                   # XML sitemap for SEO
└── README.md                     # Markdown documentation
```

---

## 🚀 Quick Start

1. Open `index.html` or `pages/index.html` directly in any web browser.
2. To test the **Parent Portal Sign In**:
   - Navigate to `pages/login.html`.
   - Click the **"1-Click Auto Fill"** button to load the demo credentials (`parent.demo@brightpath.edu`).
   - Click **"Sign In to Parent Dashboard"** to enter `pages/dashboard.html`.
3. To test **Session Booking**:
   - Open `pages/dashboard.html`.
   - Pick a subject, date, and time slot, then click **"Confirm Session Slot"**.
   - Watch the new booked slot appear dynamically in the **Upcoming Booked Sessions** list with confirmation toast!
4. To test **Dark Mode**:
   - Click the Moon/Sun icon in any navigation bar.
5. To test **RTL Layout**:
   - Click the **RTL** pill button in the top navigation bar.

---

## 🎨 Design Tokens & Customization

Custom CSS variables are defined in `assets/css/style.css`:

```css
:root {
  --bp-primary: #2563eb;        /* Royal Blue - Trust and focus */
  --bp-secondary: #059669;      /* Emerald Green - Growth and verified notes */
  --bp-accent: #f59e0b;         /* Warm Gold - Star achievements */
  --bp-purple: #8b5cf6;         /* STEM & Enrichment */
  --bp-coral: #f43f5e;          /* Action & Alerts */
  --bp-font-heading: 'Outfit', sans-serif;
  --bp-font-body: 'Plus Jakarta Sans', sans-serif;
}
```

---

## 🔌 Ready Integration Placeholders

- **Contact & Tour Form**: Compatible with [Formspree](https://formspree.io) and Netlify Forms (`action="https://formspree.io/f/YOUR_ID"`).
- **Newsletter Subscription**: Mailchimp / ConvertKit embed ready.
- **Maps**: Embedded Google Maps iframe with API key placeholder.
- **Payment**: Stripe Elements and PayPal Buttons ready placeholders in `pages/register.html`.

---

## 📜 Credits & License

- **Framework**: Bootstrap 5.3.3 (MIT)
- **Icons**: Font Awesome 6.5.2 (Free)
- **Typography**: Google Fonts (*Outfit* and *Plus Jakarta Sans*)
- **Photography**: Unsplash (Free educational license)

Created with care for **BrightPath Learning Academy**.
