if (window && document.documentElement) {
  const pathname = window.location.pathname;
  const allowDark = pathname?.includes('/docs') || pathname?.startsWith('/learn') || pathname === '/editor';
  if (!allowDark) {
    document.documentElement.className = 'light'; // always light mode for landing pages
  }
}
