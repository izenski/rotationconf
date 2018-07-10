
const CACHE_STATIC_VERSION = "V0.2";

self.addEventListener('install', event => {
    console.log(`[SW] Installing ${CACHE_STATIC_VERSION}`)

});

self.addEventListener('activate', event => {
    console.log(`[SW] ${CACHE_STATIC_VERSION} activated`);
})

self.addEventListener('fetch',event => {
    event.respondWith(
        fetch(event.request)
        .then(res => {
            console.log(`[SW] fetch retrieved ${res.url}`);
            return res;
        })
        .catch(err => {
            console.log(`[SW] error: ${err}`);
        })

    );
})