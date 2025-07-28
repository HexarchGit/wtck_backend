const axios = require("axios");
const NodeCash = require("node-cache");
const cache = new NodeCash({ stdTTL: 60 * 10 });
const proxyApiUrl = "http://www.themealdb.com/api/json/v1";
const proxyApiKey = "1";
const proxyBaseUrl = `${proxyApiUrl}/${proxyApiKey}`;

module.exports.getMealDbData = async (req, res, next) => {
  const apiUrl = `${proxyBaseUrl}${req.url.replace("/proxyDb", "")}`;
  if (cache.has(req.url) && !req.url.includes("random")) {
    return res.send(cache.get(req.url));
  }
  try {
    const responseApi = await axios.get(apiUrl);
    cache.set(req.url, responseApi.data);
    res.send(responseApi.data);
  } catch (error) {
    next(error);
  }
};
