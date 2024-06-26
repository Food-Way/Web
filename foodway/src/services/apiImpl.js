import { api } from "./api";
const apiKey = "AIzaSyAKELgmqf4j5kRAdn9EKTC28cMao0sQvJE";

async function api_call(methodParam, urlParam, dataParam, authorizationParam = "", idSessionParam = "") {
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
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

 

export default api_call;
export { api_call };