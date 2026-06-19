// Service Worker voor offline gebruik (F8)

var CACHE_NAAM = 'gezondheid-v1';

var BESTANDEN = [
  '/index.html',
  '/invoer.html',
  '/overzicht.html',
  '/css/style.css',
  '/js/opslag.js',
  '/js/taal.js',
  '/js/home.js',
  '/js/invoer.js',
  '/js/overzicht.js',
  '/locales/nl.json',
  '/locales/en.json',
  '/manifest.json'
];

// Installatie: sla bestanden op in cache
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAAM).then(function(cache) {
      return cache.addAll(BESTANDEN);
    })
  );
});

// Fetch: gebruik cache als er geen internet is
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
