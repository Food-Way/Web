import { api, api_maps } from "./api";

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

async function api_maps_call(lat, lng, apiKey) {
  try {
    const response = await api_maps.get(
      `staticmap?center=${lat},${lng}&zoom=15&size=225x100&key=${apiKey}`,
      {
        responseType: "arraybuffer",
      }
    );

    if (response.status === 200 && response.data) {
      const blob = new Blob([response.data], { type: "image/png" });
      const dataUrl = URL.createObjectURL(blob);

      return dataUrl;
    } else {
      console.error("Resposta inválida da API de Mapas:", response);
    }
  } catch (error) {
    console.error("Erro ao buscar o mapa:", error);
  }
}

export default api_call;
export { api_call, api_maps_call };