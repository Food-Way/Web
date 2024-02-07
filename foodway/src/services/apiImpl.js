import api from "./api";

async function api_call(methodParam, urlParam, dataParam, authorizationParam = "") {
  try {
    const response = await api({
      method: methodParam,
      url: urlParam,
      data: dataParam ? JSON.stringify(dataParam) : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationParam ? `Bearer ${authorizationParam}` : null,
      },
    });

    if(response.status === 200) {
        return response.data;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default api_call;