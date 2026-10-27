// Minimal service worker: makes the site installable as an app. Always loads fresh data from the network.
const C = 'kob-shell-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.add('/')).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put('/', cp)).catch(() => {}); return r; }).catch(() => caches.match('/')));
});
