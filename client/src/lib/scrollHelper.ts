// Helper function for smooth scrolling to an element
export function smoothScrollTo(elementId: string, offset: number = 80): void {
  const targetElement = document.querySelector(elementId);
  if (targetElement) {
    const top = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    });
  }
}

// Helper function to scroll to the top of the page
export function scrollToTop(smooth: boolean = true): void {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}