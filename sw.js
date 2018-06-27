self.addEventListener('install', function(e){
    console.log("[service worker], Installed");
})

self.addEventListener('activate', function(e){
    console.log("[service worker], activated");
})

self.addEventListener('fetch', function(e){
    console.log("[service worker] fetching", e.request.url)
})