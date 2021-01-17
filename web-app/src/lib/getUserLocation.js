export default async () => {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
    };
};
