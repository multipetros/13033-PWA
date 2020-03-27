const CACHEVER = '13033v1.0' ;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHEVER).then((cache) => {
      return cache.addAll([
      'index.html',
      'manifest.json',
      'images/icon-72x72.png',
      'images/icon-96x96.png',
      'images/icon-128x128.png',
      'images/icon-144x144.png',
      'images/icon-192x192.png',
      'images/icon-512x512.png',
      'images/ajax-loader.gif',
      'jquery.mobile-1.4.0.min.css',
      'jquery-1.10.2.min.js',
      'jquery.mobile-1.4.0.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        
        caches.open(CACHEVER).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return null ;
      });
    }
  }));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHEVER != cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});