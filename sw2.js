
const CACHE_STATIC_VERSION = "V2.0";
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
        .then(response => {
            if (response){
                console.log(`[SW] returning cached ${response.url}`);
                return response;
            }
            else {
                return fetch(event.request)
                .then(res => {
                    console.log(`[SW] fetch retrieved ${res.url}`);
                    return res;
                })
                .catch(err => {
                    console.log(`[SW] error: ${err}`);
                })
            }
        })

    );
})