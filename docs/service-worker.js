importScripts("/precache-manifest.c76e5f9d1d5f30b3ecec5bc98253a6f6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Inside src/service-worker.js
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

