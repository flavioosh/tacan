/// <reference lib="webworker" />

import { build, files, timestamp } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const CACHE_NAME = `cache-${timestamp}`;

const toCache = build.concat(files);
const staticAssets = new Set(toCache);

worker.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(toCache))
      .then(() => {
        worker.skipWaiting();
      }),
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE_NAME) {
          await caches.delete(key);
        }
      }

      worker.clients.claim();
    }),
  );
});

async function fetchAndCache(request: Request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response) return response;

    throw err;
  }
}

worker.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') {
    return;
  }

  const url = new URL(event.request.url);

  const isHttp = url.protocol.startsWith('http');
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const uncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

  if (isHttp && !uncached) {
    event.respondWith(
      (async () => {
        const cachedAsset = isStaticAsset && (await caches.match(event.request));

        return cachedAsset || fetchAndCache(event.request);
      })(),
    );
  }
});
