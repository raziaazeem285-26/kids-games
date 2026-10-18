/* Turbo Racing 3D service worker */
var CACHE='turbo-racing-3d-v9';
var ASSETS=[
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.149.0/three.min.js'
];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ self.skipWaiting(); }));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ self.clients.claim(); }));
});
self.addEventListener('fetch',function(e){
  e.respondWith(caches.match(e.request).then(function(r){ return r||fetch(e.request); }));
});
