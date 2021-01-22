<template>
    <section class="EditLocation">
		<v-text-field label="Search" v-model="map.searchTerm" @input="onSearchInput"/>
		<google-map :center=""/>
        <v-text-field label="Name" v-model="editedValue.name" @input="onValueChange"/>
    </section>
</template>

<script>
import GoogleMap from './GoogleMap';

export default {
	components: {
		GoogleMap
	},
    data: () => ({
		editedValue: {},
		userLocation: null,
		map: {
			center: {
				// TODO move these default values to a config file
                latitude: 51.508,
                longitude: 0.1281,
			},
			searchTerm: ''
		}
    }),
    props: {
        value: {
            required: true,
            type: Object,
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', this.editedValue);
		},
		async goToCurrentLocation() {
            try {
				this.userLocation = await getUserLocation();
                this.map.center = this.userLocation;
                const place = await geocode(
                    {
                        location: {
                            lat: this.userLocation.latitude,
                            lng: this.userLocation.longitude,
                        },
                    },
                    this.geocoder
                );
                this.map.searchTerm = place.formatted_address;
            } catch (err) {
                this.page.errorMessage = err.message;
            }
        },
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
