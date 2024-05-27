import { color } from "chart.js/helpers";
import mapboxgl from "mapbox-gl";

type Marker = {
  lat: number;
  lng: number;
  color: string;
  properties: {
    width: number;
    height: number;
  };
};

const MARKERS: Marker[] = [
  {
    lat: 48.8566,
    lng: 2.3522,
    color: "#d00",
    properties: {
      width: 30,
      height: 30,
    },
  },
  {
    lat: 48.8599,
    lng: 2.3539,
    color: "#FFFFFF",
    properties: {
      width: 30,
      height: 30,
    },
  },
  {
    lat: 48.8534,
    lng: 2.3488,
    color: "#000000",
    properties: {
      width: 30,
      height: 30,
    },
  },
];

export const useMapBox = (
  isModalOpen: globalThis.Ref<boolean>,
  isMapLoaded: globalThis.Ref<boolean>,
) => {
  const loadMapBox = () => {
    try {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.3522, 48.8566],
        zoom: 12,
      });

      MARKERS.forEach((marker: Marker) => {
        const markerElement = document.createElement("div");
        markerElement.className = "marker";
        markerElement.style.backgroundColor = marker.color;
        markerElement.style.width = `${marker.properties.width}px`;
        markerElement.style.height = `${marker.properties.height}px`;

        markerElement.addEventListener("click", () => {
          isModalOpen.value = true;
        });

        new mapboxgl.Marker(markerElement)
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);
      });

      isMapLoaded.value = true;
      return { map };
    } catch (error) {
      throw new Error("Error loading mapbox");
    }
  };

  return { loadMapBox };
};
