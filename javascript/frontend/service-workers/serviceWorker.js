// Based on:
// - https://css-tricks.com/serviceworker-for-offline/

const VERSION = 1;

const OFFLINE_HTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Failed to Load</title>
    </head>
    <body>
      <h1>Oh Noes!!!</h1>
      <p>Couldn't load this page</p>
      <p>You may be offline...</p>
    </body>
  </html>
`;

const updateCache = async (event, response) => {
  const responseForCache = response.clone();

  const cache = await caches.open(VERSION);
  cache.put(event.request, responseForCache);
  console.log(`Cache updated for ${event.request.url}`);
};

const getFailedRequestResponse = (request, failedResponse) => {
  if (request.destination === 'document') {
    return new Response(OFFLINE_HTML, {
      status: 503,
      statusText: 'Service Unavailable',
      // https://developer.mozilla.org/en-US/docs/Web/API/Headers
      headers: new Headers({
        'Content-Type': 'text/html',
      }),
    });
  }

  return failedResponse;
}

const fetchAndUpdateCache = async (event) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Response
  let response;
  try {
    response = await fetch(event.request);
  } catch (e) {
    return getFailedRequestResponse(event.request, response);
  }
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
