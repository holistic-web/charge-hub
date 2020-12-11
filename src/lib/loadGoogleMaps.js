import { Loader } from 'google-maps';

const loader = new Loader('AIzaSyCezAcRBAa44EYeUev8qgkzxfotiObhQS0', {});
let google = null;

export default async function() {
	if (google) return google;
	return loader.load();
}
