let cacheName = 'v1';
let cacheFiles = [
    './',
    'index.html',
    './css/main.css',
    '/app.js',
    
]


self.addEventListener('install', function(e){
    console.log("[service worker], Installed");
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[service worker] caching files");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("[service worker], activated");
})

self.addEventListener('fetch', function(e){
    console.log("[service worker] fetching", e.request.url)
})