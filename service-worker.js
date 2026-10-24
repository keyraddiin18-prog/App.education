const CACHE_NAME = "keyraddiin-education-v16"; // v16 godheera

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",  // Suuraa haaraa
    "./icon-512.png"   // Suuraa haaraa
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(APP_FILES);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request);
        }).catch(function () {
            if (event.request.mode === 'navigate') {
                return caches.match("./index.html");
            }
        })
    );
});
