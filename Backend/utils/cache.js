const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const cacheGet = (key) => cache.get(key);

const cacheSet = (key, value, ttl = 300) => cache.set(key, value, ttl);

const cacheDel = (key) => cache.del(key);

const cacheInvalidatePattern = (pattern) => {
  const keys = cache.keys();
  const regex = new RegExp(pattern);
  keys.forEach(key => {
    if (regex.test(key)) cache.del(key);
  });
};

module.exports = { cache, cacheGet, cacheSet, cacheDel, cacheInvalidatePattern };