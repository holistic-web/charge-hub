<template>
    <section class="EditLocation">
        <div>
            <v-text-field
                label="Search then click the map to add a pin"
                v-model="map.searchTerm"
                @input="onSearchInput"
            />
            <google-map
                class="EditLocation__map"
                :center="map.center"
                :pins="pins"
                @mapClick="onMapClick"
            />
        </div>
        <v-text-field
            label="Give this charge point a name"
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
        page: {
			isSubmitting: false,
        },
        editedValue: {},
        map: {
            center: {
                // TODO move these default values to a config file
                latitude: 51.508,
                longitude: 0.1281,
            },
			searchTerm: '',
			lastSearchTerm: '',
        },
        geocoder: null,
    }),
    computed: {
        pins() {
            if (!this.editedValue.location) return [];
            return [
                {
                    location: this.editedValue.location,
                    title: 'Your Location',
                },
            ];
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', this.editedValue);
        },
        onSearchInput: _.debounce(async function() {
			if (this.map.searchTerm === this.map.lastSearchTerm) return;
            const place = await geocode(
                { address: this.map.searchTerm },
                this.geocoder
            );
            this.map.center = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
            };
        }, 500),
        onMapClick(location) {
            this.editedValue.location = location;
            this.onValueChange();
		},
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
    > * {
        margin-bottom: 1rem;
    }

    &__map {
        height: 250px;
    }
}
</style>
