import { api, nifi_url } from "./api";
const apiKey = "AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE";

async function api_call(methodParam, urlParam, dataParam, authorizationParam = "", idSessionParam = "") {
  console.log("metodo:" + methodParam);
  console.log("url:" + urlParam);
  console.log("data:" + dataParam);
  console.log("authorization:" + authorizationParam);
  console.log("idSession:" + idSessionParam);
  try {
    const response = await api({
      method: methodParam,
      url: urlParam,
      data: dataParam ? JSON.stringify(dataParam) : undefined,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: authorizationParam ? `Bearer ${authorizationParam}` : null,
        ID_SESSION: idSessionParam ? idSessionParam : null,
      },
    });

    if (response.status === 200) {
      return response
    } else if (response.status === 204) {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function nifi_call(methodParam, urlParam, dataParam) {
  try {
    const response = await nifi_url({
      method: methodParam,
      url: urlParam,
      data: dataParam ? JSON.stringify(dataParam) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default api_call;
export { api_call, nifi_call };