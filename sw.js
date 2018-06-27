self.addEventListener('install', function(e){
    console.log("[service worker], Installed");
    
    e.waitUntil(
        caches.open('v1').then(function(cache){
            console.log("[service worker] caching files");
            return cache.addAll([
                '/',
                'index.html',
                'css/main.css',
                'app.js',
                
            ]);
        })
    )
   
})

self.addEventListener('activate', function(e){
    console.log("[service worker], activated");
  e.waitUntil(
      caches.keys().then(function(cacheNames){
          return promise.all(cacheNames.map(function(thisCacheName){
              if(thisCacheName !== cacheName){
                  console.log("Service worker removing cache file");
                  return caches.delete(thisCacheName);
              }
          }))
      })
  )
})

self.addEventListener('fetch', function(e){
    console.log("[service worker] fetching", e.request.url)
})