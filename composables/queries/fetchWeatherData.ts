import { $fetch } from "ofetch";

export const fetchWeatherData = async (
  params: {
    commandId: number;
  },
  headers?: HeadersInit,
): Promise<any> => {
  const { commandId } = params;

  const response = await fetch(
    `https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${commandId}`,
    {
      method: "GET",
      headers: headers ?? {},
    },
  );

  return response.json();
};
