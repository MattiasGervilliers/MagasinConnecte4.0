export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  const mapboxglAccessToken = config.mapboxglAccessToken;

  return mapboxglAccessToken;
});
