/**
 * Toggles directly between light and dark themes.
 *
 * Dependencies:
 *  - Theme (${JS_ROOT}/theme.js)
 */

const toggle = document.querySelector('#mode-toggle');
const icon = document.querySelector('#mode-toggle-icon');

function updateToggleIcon() {
  const isDark = Theme.isDark;
  icon.classList.toggle('fa-sun', !isDark);
  icon.classList.toggle('fa-moon', isDark);
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

export function modeWatcher() {
  if (!Theme.isToggleable || !toggle || !icon) {
    return;
  }

  updateToggleIcon();

  toggle.addEventListener('click', () => {
    Theme.update(Theme.isDark ? Theme.Mode.LIGHT : Theme.Mode.DARK);
    updateToggleIcon();
  });

  window.addEventListener('message', (event) => {
    if (event.data?.id === Theme.eventId) {
      updateToggleIcon();
    }
  });
}