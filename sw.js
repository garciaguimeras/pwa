var CACHE_NAME = 'pwa-v2';
var FILES = [
  '',
  'index.html',
  'js/app.js',  
  'img/icon192.png',
  'img/icon512.png',
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

/*
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
*/

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).then(
      function(response) {
        console.log('[Service Worker] Fetching OK: ' + e.request.url);
        return caches.open(CACHE_NAME).then((cache) => {
          console.log('[Service Worker] Caching resource: '+ e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      },
      function(err) {
        console.log('[Service Worker] Fetching ERROR: ' + err);
        return caches.match(e.request).then((r) => {
          console.log('[Service Worker] Getting resource from cache: '+ e.request.url);
          return r;
        });
      }
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache: ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});
