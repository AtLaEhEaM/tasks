// Smooth scroll for navigation links
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Single floating scroll down button - detects current section and scrolls to next
const scrollToNextBtn = document.querySelector('.scroll-to-next-btn');
const sections = document.querySelectorAll('.section-fullscreen, .hero-section');

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
