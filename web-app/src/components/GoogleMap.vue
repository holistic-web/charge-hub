<template>
    <section class="GoogleMap" ref="map">
        <loader />
    </section>
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';
import Loader from './Loader';

function convertGeoLocationToGoogle(location) {
    return {
        lat: location.latitude,
        lng: location.longitude,
    };
}

function convertGeoLocationFromGoogle(location) {
    return {
        latitude: location.lat(),
        longitude: location.lng(),
    };
}

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
            default: 18,
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
            markers: [],
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
                center: convertGeoLocationToGoogle(this.center),
                zoom: this.zoom,
            });
            this.map.addListener('click', mapsMouseEvent => {
                this.$emit(
                    'mapClick',
                    convertGeoLocationFromGoogle(mapsMouseEvent.latLng)
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
            if (this.markers.length > 0) {
                this.markers.forEach(marker => marker.setMap(null));
                this.markers = [];
            }
            pins.forEach(pin => {
                const marker = new this.googleService.maps.Marker({
                    position: convertGeoLocationToGoogle(pin.location),
                    map: this.map,
                    icon: pin.icon,
                    draggable: pin.draggable,
                });
                if (pin.infoWindow) {
                    marker.addListener('click', () => {
                        this.infoWindow.setContent(pin.infoWindow);
                        this.infoWindow.open(this.map, marker);
                    });
                }
                this.markers.push(marker);
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
