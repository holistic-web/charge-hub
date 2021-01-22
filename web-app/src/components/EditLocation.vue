<template>
    <section class="EditLocation">
        <v-text-field
            label="Search"
            v-model="map.searchTerm"
            @input="onSearchInput"
        />
        <google-map
            class="EditLocation__map"
            :center="map.center"
            :pins="pins"
        />
        <v-text-field
            label="Name"
            v-model="editedValue.name"
            @input="onValueChange"
        />
    </section>
</template>

<script>
import _ from 'lodash';
import loadGoogleMaps from '../lib/loadGoogleMaps';
import geocode from '../lib/geocode';
import GoogleMap from './GoogleMap';

export default {
    components: {
        GoogleMap,
    },
    props: {
        value: {
            required: true,
            type: Object,
        },
    },
    data: () => ({
        editedValue: {},
        map: {
            center: {
                // TODO move these default values to a config file
                latitude: 51.508,
                longitude: 0.1281,
            },
            searchTerm: '',
        },
        geocoder: null,
    }),
    computed: {
        pins() {
            return [];
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', this.editedValue);
        },
        onSearchInput: _.debounce(async function() {
            const place = await geocode(
                { address: this.map.searchTerm },
                this.geocoder
            );
            this.map.center = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
            };
        }, 500),
    },
    async created() {
        const googleService = await loadGoogleMaps();
        this.geocoder = new googleService.maps.Geocoder();
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.editedValue = { ...this.value };
            },
        },
    },
};
</script>

<style lang="scss">
.EditLocation {
    &__map {
        height: 250px;
    }
}
</style>
