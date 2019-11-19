
const CACHE_STATIC_VERSION = "V0.1";

self.addEventListener('install', event => {
    console.log(`ServiceWorker Installing ${CACHE_STATIC_VERSION}`,event)
});

self.addEventListener('activate', event => {
    console.log(`ServiceWorker ${CACHE_STATIC_VERSION} activated`,event);
    //return self.clients.claim();
});

self.addEventListener('fetch',event => {
    event.respondWith(
        fetch(event.request)
        .then(res => {
            console.log(`ServiceWorker fetch retrieved ${res.url}`);
            return res;
        })
        .catch(err => {
            console.log(`ServiceWorker error: ${err}`);
        })

    );
});

