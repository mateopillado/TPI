import { router } from './router.js';
import { initStore } from './store.js';

// Initialize the store
initStore();

if (!window.location.hash) {
    window.location.hash = '#/'; // Set default hash if none exists
}
// Initial route handling
router(window.location.hash);


// Handle route changes
window.addEventListener('hashchange', () => {
    router(window.location.hash);
});