
const CACHE_STATIC_VERSION = "V1.00";
const STATIC_CACHE_FILES = [
    '/index.html',
    '/',
    '/css/bootstrap.min.css',
    '/js/app.js',
    '/manifest.json'
]

self.addEventListener('install', event => {
    console.log(`ServiceWorker Installing ${CACHE_STATIC_VERSION}`,event)

    event.waitUntil(
        caches.open(CACHE_STATIC_VERSION)
        .then(cache => cache.addAll(STATIC_CACHE_FILES)
        )
    )
});

self.addEventListener('activate', event => {
    console.log(`ServiceWorker ${CACHE_STATIC_VERSION} activated`,event);
})

self.addEventListener('fetch',event => {
    event.respondWith(
        caches.match(event.request)
    );
})