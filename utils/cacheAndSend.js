module.exports.cacheAndSend = (res, cache, key, data) => {
  cache.set(key, data);
  return res.send(data);
};
