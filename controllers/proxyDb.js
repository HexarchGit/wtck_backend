const NodeCash = require("node-cache");
const { ServerError } = require("../utils/errors");

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
    const responseApi = await fetch(apiUrl);
    if (!responseApi.ok)
      throw new ServerError(
        `Request through proxy failed with code ${responseApi.status}`
      );
    const data = await responseApi.json();
    cache.set(req.url, data);
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};
