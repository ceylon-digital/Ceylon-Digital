const CACHE_NAME = 'ceylon-cache-v1';
const urlsToCache = [
   '/',
   '/index.html',
   '/assets/css/style.css',
   '/assets/js/script.js',
   '/assets/icons/favicon-32x32.png'
];

// Install SW and cache files
self.addEventListener('install', event => {
   event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
         return cache.addAll(urlsToCache);
      })
   );
});

// Fetch from cache if available, else from network
self.addEventListener('fetch', event => {
   event.respondWith(
      caches.match(event.request)
      .then(response => response || fetch(event.request))
   );
});

// Optional: Activate and remove old caches
self.addEventListener('activate', event => {
   const cacheWhitelist = [CACHE_NAME];
   event.waitUntil(
      caches.keys().then(cacheNames =>
         Promise.all(
            cacheNames.map(cache => {
               if (!cacheWhitelist.includes(cache)) {
                  return caches.delete(cache);
               }
            })
         )
      )
   );
});