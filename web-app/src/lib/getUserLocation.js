export default async () => {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    });

    return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
    };
};
