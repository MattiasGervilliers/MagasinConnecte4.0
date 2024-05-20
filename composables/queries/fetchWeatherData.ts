import { $fetch } from "ofetch";

// TODO: manage headers
export const fetchWeatherData = async (params: {
  commandId: number
}): Promise<any> => {
  const { commandId } = params;

  return await $fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${commandId}`, {
    method: 'GET',
  });
};
