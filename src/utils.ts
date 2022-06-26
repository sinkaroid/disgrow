import phin from "phin";

/**
 * Call api and return the response
 * @param {string} url some endpoint
 * @param {string} method GET, POST, PUT, DELETE
 * @param {object} data data to send
 * @returns {Promise<object>}
 */
export async function request(url: string, method: string, data?: object) {
 
  return await phin({
    method: method,
    url: url,
    parse: "json",
    data: data
  }).catch(err => {
    throw new Error(`${err.message} Are you sure this bot listed in top.gg?`);
  });
}
