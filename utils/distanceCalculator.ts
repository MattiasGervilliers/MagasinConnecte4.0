import type {Station} from "~/models/weatherReport";

export const findClosestStation = (station: Station[]) => {
    let index = 0;
    for (let i = 0; i < station.length; i++) {
        if (!station[i].isOpen) continue;
        index = i;
    }
    let closest: Station = station[index];
    let closestDistance = calculateDistance(station[index].lat, station[index].lon);
    for (let i = 1; i < station.length; i++) {
        if (!station[i].isOpen) continue;
        const distance = calculateDistance(station[i].lat, station[i].lon);
        if (distance < closestDistance) {
            closest = station[i];
            closestDistance = distance;
        }
    }
    return closest;
}

const calculateDistance = (latitude: number, longitude: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (43.3186 - latitude) * Math.PI / 180;
    const dLon = (5.4084 - longitude) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(latitude * Math.PI / 180) * Math.cos(43.3186 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
}