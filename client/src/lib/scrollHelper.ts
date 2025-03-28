// Helper function for smooth scrolling
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