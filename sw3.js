
const CACHE_STATIC_VERSION = "V3.00";
const CACHE_DYNAMIC_VERSION = "DynamicV3.0"
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
        .then(response => {
            if (response){
                console.log(`ServiceWorker returning cached ${response.url}`,event);
                return response;
            }
            else {
                return fetch(event.request)
                .then(response => {
                    console.log(`ServiceWorker fetch retrieved ${response.url}`,event);
                    //return response;
                    return caches.open(CACHE_DYNAMIC_VERSION)
                    .then(cache => {
                        cache.put(event.request.url, response.clone())
                        console.log(`Added ${event.request.url} to dynamic cache`,event);
                        return response;
                    })
                })
                .catch(err => {
                    console.log(`ServiceWorker error: ${err}`,event);
                })
            }
        })

    );
})

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;
  
    console.log('onnotificationclick',notification);

    if (action === 'cancel'){
        // do an action to cancel the class registration
    }
    else if (action === 'location'){
        clients.openWindow('https://www.bing.com/maps');
    }
    notification.close();

});

self.addEventListener('notificationclose', event => {
const notification = event.notification;
const action = notification.action;

console.log('Closed notification: ' + action);
});