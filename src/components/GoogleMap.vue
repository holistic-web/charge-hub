<template>
	<section class="Map" ref="map" />
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';

function convertGeoLocation(location) {
	return {
		lat: location.latitude,
		lng: location.longitude
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
				center: convertGeoLocation(this.center),
				zoom: 8
			});
			this.pins.forEach(pin => {
				pin.marker = new this.googleService.maps.Marker({
					position: convertGeoLocation(pin.location),
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
