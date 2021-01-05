<template>
	<section class="Map" ref="map" />
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';

function convertGeoLocationToGoole(location) {
	return {
		lat: location.latitude,
		lng: location.longitude
	};
}

function convertGeoLocationFromGoole(location) {
	return {
		latitude: location.lat(),
		longitude: location.lng()
	};
}

export default {
	props: {
		center: {
			type: Object,
			required: true
		},
		pins: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			googleService: null,
			map: null
		};
	},
	computed: {
		isMapRendered() {
			return this.googleService && this.map;
		}
	},
	methods: {
		drawMap() {
			this.map = new this.googleService.maps.Map(this.$refs.map, {
				center: convertGeoLocationToGoole(this.center),
				zoom: 16
			});
			this.map.addListener('click', mapsMouseEvent => {
				this.$emit('mapClick', convertGeoLocationFromGoole(mapsMouseEvent.latLng));
			});
			this.pins.forEach(pin => {
				pin.marker = new this.googleService.maps.Marker({
					position: convertGeoLocationToGoole(pin.location),
					map: this.map,
					title: pin.description
				});
			});
		}
	},
	async created() {
		this.googleService = await loadGoogleMaps();
		this.drawMap();
	},
	watch: {
		center() {
			if (this.isMapRendered) this.drawMap();
		},
		pins() {
			if (this.isMapRendered) this.drawMap();
		}
	}
};
</script>
