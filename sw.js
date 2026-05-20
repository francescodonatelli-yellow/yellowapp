// Service Worker vuoto - forza deregistrazione
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
