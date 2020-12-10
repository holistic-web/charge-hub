import { Loader } from 'google-maps';

const loader = new Loader('my-api-key', {});
let google = null;

export default async function() {
	if (google) return google;
	return loader.load();
}
