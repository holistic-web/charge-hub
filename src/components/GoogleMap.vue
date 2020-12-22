<template>
    <section class="Map" ref="map" />
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';

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
        isPageReady() {
            return !!this.googleService
                && !!this.map
        }
    },
    methods: {
        drawMap() {
            this.map = new this.googleService.maps.Map(this.$refs.map, {
                center: this.center,
                zoom: 16,
            });
        },
        drawPins() {
            for (let i=0; i<this.pins.length; i++) {
                const pin = this.pins[i];
                pin.marker = new this.googleService.maps.Marker({
                    position: {
                        lat: pin.location.latitude,
                        lng: pin.location.longitude
                    },
                    map: this.map,
                });
            }
        }
    },
    async created() {
        this.googleService = await loadGoogleMaps();
        await this.$nextTick();
        this.drawMap();
    },
    watch: {
        pins() {
            if (this.isPageReady) this.drawPins();
        },
        isPageReady() {
            this.drawPins();
        }
    }          
};
</script>
