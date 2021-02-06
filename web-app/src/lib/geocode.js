import loadGoogleMaps from './loadGoogleMaps';

// Thanks to  https://stackoverflow.com/a/46064393 for the head start here, it's now somewhat modified
export default async function geocode(options) {
    const googleService = await loadGoogleMaps();
    const geocoder = new googleService.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode(options, function(results, status) {
            if (status === 'OK') {
                resolve(results[0]);
            } else {
                reject(
                    new Error(
                        "Couldnt't find the location " + JSON.stringify(options)
                    )
                );
            }
        });
    });
}
