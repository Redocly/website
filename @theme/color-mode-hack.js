if (window && document.documentElement) {
  const pathname = window.location.pathname;
  if (!pathname?.includes('/docs')) {
    document.documentElement.className = 'light'; // always light mode for landing pages
  }
}
