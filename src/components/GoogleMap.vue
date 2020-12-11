<template>
  <section class="Map" ref="map"/>
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';

export default {
  data() {
    return {
      google: null
    }
  },
  async created() {
    this.google = await loadGoogleMaps();
  },
  methods: {
    drawMap() {
      new this.google.maps.Map(this.$refs.map, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  },
  watch: {
    google() {
      if (this.google) this.drawMap();
    }
  }
}
</script>