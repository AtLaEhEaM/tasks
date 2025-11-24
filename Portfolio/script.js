// Graceful initialization
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links that point to sections
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Single floating scroll down button - detects current section and scrolls to next
  const scrollToNextBtn = document.querySelector('.scroll-to-next-btn');
  const sections = Array.from(document.querySelectorAll('.hero-section, .section-fullscreen'));

  if (scrollToNextBtn) {
    scrollToNextBtn.addEventListener('click', () => {
      const scrollPosition = window.innerHeight / 2 + window.scrollY;
      let currentSectionIndex = 0;

      // Find the current section based on scroll position
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionIndex = index;
        }
      });

      const nextIndex = currentSectionIndex + 1;

      if (nextIndex < sections.length) {
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on last section, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Contact form handling: if a Formspree endpoint is provided in data-formspree, submit there; otherwise open mailto.
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill out all fields.';
        return;
      }

      if (!validateEmail(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      const endpoint = form.getAttribute('data-formspree');
      // If endpoint provided, post JSON (Formspree accepts form posts)
      if (endpoint) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
          });
          if (res.ok) {
            status.textContent = 'Thanks — message sent.';
            form.reset();
          } else {
            status.textContent = 'Sending failed. Please try again later.';
          }
        } catch (err) {
          status.textContent = 'Network error — please try again.';
        }
      } else {
        // Fallback: open user's mail client with prefilled subject & body
        const subject = encodeURIComponent(`Website contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:hello@bulbsol.example?subject=${subject}&body=${body}`;
      }
    });
  }
});
