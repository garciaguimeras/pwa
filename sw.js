var CACHE_NAME = 'pwa-v1';
var FILES = [
  '',
  'index.html',
  'js/app.js',  
  'img/icon192.png',
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then((cache) => {
            console.log('[Service Worker] Caching all');
            return cache.addAll(FILES);
          })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
          .then((r) => {
            console.log('[Service Worker] Fetching resource: '+ e.request.url);

            return r || fetch(e.request)
                        .then((response) => {
                          return caches.open(CACHE_NAME)
                                        .then((cache) => {
                                          console.log('[Service Worker] Caching new resource: '+ e.request.url);
                                          cache.put(e.request, response.clone());
                                          return response;
                                        });
                        });
          })
  );
});
