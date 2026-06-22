// Service worker minimal — version 2.0.9 / cache v17
// Ne met pas l'application en cache pour éviter de bloquer les mises à jour.
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if (self.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
