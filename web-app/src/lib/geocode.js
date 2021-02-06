// Thanks to  https://stackoverflow.com/a/46064393 for the head start here, it's now somewhat modified
export default function geocode(options, geocoder) {
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
