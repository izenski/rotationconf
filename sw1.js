
const CACHE_STATIC_VERSION = "V1.1";
const STATIC_CACHE_FILES = [
    '/index.html',
    '/',
    '/css/bootstrap.min.css',
    '/js/app.js'
]

self.addEventListener('install', event => {
    console.log(`[SW] Installing ${CACHE_STATIC_VERSION}`)

    event.waitUntil(
        caches.open(CACHE_STATIC_VERSION)
        .then(cache => cache.addAll(STATIC_CACHE_FILES)
        )
    )
});

self.addEventListener('activate', event => {
    console.log(`[SW] ${CACHE_STATIC_VERSION} activated`);
})

self.addEventListener('fetch',event => {
    event.respondWith(
        caches.match(event.request)
    );
})