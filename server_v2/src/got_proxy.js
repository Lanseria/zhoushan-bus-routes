const got = require("got");
const tunnel = require("tunnel");
const config = require("./config");
const { gotHostPrefix, gotHostNewsPrefix } = config;
const isDevelopmentProxy = process.env.NODE_ENV === "development-proxy";

const gotConfig = {
  agent: isDevelopmentProxy
    ? tunnel.httpOverHttp({
        proxy: {
          host: "localhost",
          port: 8888,
        },
      })
    : false,
};

exports.getFromServer = async function (apiUrl, query) {
  const url = gotHostPrefix + apiUrl;
  const response = await got.get(url, {
    ...gotConfig,
    query: query,
  });
  return response;
};

exports.getNewsFromServer = async function (apiUrl, query) {
  const url = gotHostNewsPrefix + apiUrl;
  const response = await got.get(url, {
    ...gotConfig,
    query: query,
  });
  return response;
};

exports.postFromServer = async function (apiUrl, querystring) {
  const url = gotHostPrefix + apiUrl;
  const response = await got.post(url, {
    ...gotConfig,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": `BusXing/1.3.0 (iPhone; iOS 11.4.1; Scale/3.00)`,
    },
    body: querystring,
  });
  return response;
};
