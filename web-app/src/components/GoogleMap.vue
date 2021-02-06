<template>
    <section class="GoogleMap" ref="map">
        <loader />
    </section>
</template>

<script>
import Handlebars from 'handlebars';
import loadGoogleMaps from '../lib/loadGoogleMaps';
import Loader from './Loader';

function convertGeoLocationToGoole(location) {
    return {
        lat: location.latitude,
        lng: location.longitude,
    };
}

function convertGeoLocationFromGoole(location) {
    return {
        latitude: location.lat(),
        longitude: location.lng(),
    };
}

const infoWindowSource = `
<div id="content">
	<h1 id="firstHeading" class="firstHeading">{{name}}</h1>
	<div id="bodyContent">
	{{#if description}}
		<p>{{description}}</p>
	{{/if}}
	{{#each tags}}
		<span class="Tag">#{{this}}</span>
	{{/each}}
	</div>

	<style>
		.Tag {
			background-color: #B098E9;
			border-radius: 0.15rem;
			padding: 0.1rem 0.2rem;
		}
	</style>
</div>
`;
const infoWindowTemplate = Handlebars.compile(infoWindowSource);

export default {
    components: {
        Loader,
    },
    props: {
        center: {
            type: Object,
            required: true,
        },
        zoom: {
            type: Number,
            required: true,
        },
        pins: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            googleService: null,
            map: null,
            infoWindow: null,
        };
    },
    computed: {
        isMapRendered() {
            return this.googleService && this.map;
        },
    },
    methods: {
        drawMap() {
            this.map = new this.googleService.maps.Map(this.$refs.map, {
                center: convertGeoLocationToGoole(this.center),
                zoom: 18,
            });
            this.map.addListener('click', mapsMouseEvent => {
                this.$emit(
                    'mapClick',
                    convertGeoLocationFromGoole(mapsMouseEvent.latLng)
                );
            });
            this.infoWindow = new this.googleService.maps.InfoWindow();
            this.drawPins(this.pins);
        },
        setMapCenter(center) {
            this.map.setCenter(
                new this.googleService.maps.LatLng(
                    center.latitude,
                    center.longitude
                )
            );
        },
        setMapZoom(zoom) {
            this.map.setZoom(zoom);
        },
        drawPins(pins) {
            pins.forEach(pin => {
                const marker = new this.googleService.maps.Marker({
                    position: convertGeoLocationToGoole(pin.location),
                    map: this.map,
                    icon: pin.icon,
                });
                marker.addListener('click', () => {
                    this.infoWindow.setContent(infoWindowTemplate(pin));
                    this.infoWindow.open(this.map, marker);
                });
            });
        },
    },
    async created() {
        this.googleService = await loadGoogleMaps();
        this.drawMap();
    },
    watch: {
        center() {
            if (this.isMapRendered) this.setMapCenter(this.center);
        },
        pins() {
            if (this.isMapRendered) this.drawPins(this.pins);
        },
        zoom() {
            if (this.isMapRendered) this.setMapZoom(this.zoom);
        },
    },
};
</script>
