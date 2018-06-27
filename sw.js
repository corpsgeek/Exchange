this.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/Exchange/',
          '/Exchange/index.html',
          '/Exchange/css/main.css',
          '/Exchange/app.js',
          '/Exhange/Readme.md'
           ]);
      })
    );
  });

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