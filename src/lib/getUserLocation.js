export default async () => {
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
		// console.log('Location Data', MarkerOptions.title);

	});
	// console.log('POS', pos.geolocation);

	return {
		longitude: pos.coords.longitude,
		latitude: pos.coords.latitude
	};
};
