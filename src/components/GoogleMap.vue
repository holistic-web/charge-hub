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
        }
    },
    data() {
        return {
            google: null,
        };
    },
    async created() {
        this.google = await loadGoogleMaps();
    },
    methods: {
        drawMap() {
            new this.google.maps.Map(this.$refs.map, {
                center: this.center,
                zoom: 11
            });
        },
    },
    watch: {
        google() {
            if (this.google) this.drawMap();
        },
    },
};
</script>
