if (typeof window !== 'undefined' && document.documentElement) {
  const pathname = window.location.pathname;
  const allowDark = pathname === '/editor' || pathname === '/preview';

  const setModeClass = (mode) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    
    // Add 'manual' class when on preview route
    if (pathname === '/preview') {
      root.classList.add('manual');
    }
  };

  const applyTheme = () => {
    const stored = allowDark ? localStorage.getItem('colorSchema') : null;
    const mode = stored === 'dark' || stored === 'light' ? stored : 'light';
    setModeClass(mode);
  };

  // Initialize theme on load
  applyTheme();

  // Sync theme across tabs/windows (e.g., editor -> preview)
  if (allowDark) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'colorSchema') {
        const next = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : 'dark';
        setModeClass(next);
      }
    });
  }
}
