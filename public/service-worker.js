// Service Worker file

const CACHE_NAME = 'my-cache-v1';

// List of resources to be cached
const urlsToCache = [
  '/',

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the requested resource is in the cache, return it
      if (response) {
        return response;
      }

      // Otherwise, fetch the resource from the network
      return fetch(event.request).then((networkResponse) => {
        // Cache the fetched resource for future use
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
            return cache.put(event.request, networkResponse.clone());
          })
        );

        return networkResponse;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 76 and earlier from showing the mini-infobar
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredInstallPrompt = event;
  // Update UI to notify the user they can add to home screen
  showInstallButton();
});

let deferredInstallPrompt = null;

// Display the install button
const showInstallButton = () => {
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';
  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredInstallPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Reset the deferred prompt variable
      deferredInstallPrompt = null;
    });
  });
};