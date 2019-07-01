// Based on:
// - https://css-tricks.com/serviceworker-for-offline/

const VERSION = 1;

const updateCache = async (event, response) => {
  const responseForCache = response.clone();

  const cache = await caches.open(VERSION);
  cache.put(event.request, responseForCache);
  console.log(`Cache updated for ${event.request.url}`);
};

const fetchAndUpdateCache = async (event) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Response
  const response = await fetch(event.request);
  updateCache(event, response);
  return response;
};

const fetchCacheFirst = async (event) => {
  const cachedResource = await caches.match(
    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    event.request
  );
  const fromNetwork = fetchAndUpdateCache(event);

  if (cachedResource) {
    console.log(`Using cached resource for ${event.request.url}`);
    return cachedResource;
  }

  console.log(`Using network for ${event.request.url}`);
  return fromNetwork;
};

self.addEventListener('install', (event) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
  event.waitUntil(
    // https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
    caches.open(VERSION).then((cache) => {
      return cache.addAll([
        '/',
        'styles.css',
        'app.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      ]);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(fetchCacheFirst(event));
});
