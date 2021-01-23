<template>
    <section class="Map">
        <v-alert
            class="Map__alert"
            v-if="page.errorMessage"
            type="error"
            v-text="page.errorMessage"
            dismissible
        />

        <template>
            <v-text-field
                placeholder="Search"
                prepend-inner-icon="mdi-map-marker"
                append-icon="mdi-map-search"
                v-model="map.searchTerm"
                full-width
                hide-details
                outlined
                clearable
                @click:prepend-inner="goToCurrentLocation"
                @click:append="lookUpLocation"
                @keyup.enter="lookUpLocation"
            />

            <div class="Map__inner">
                <loader v-if="page.isLoading" />
                <google-map v-else class="Map__map" :center="map.center" :pins="pins" />
            </div>
        </template>
    </section>
</template>

<script>
import loadGoogleMaps from '../lib/loadGoogleMaps';
import Loader from '../components/Loader';
import GoogleMap from '../components/GoogleMap';
import firebaseService from '../lib/firebaseService';
import getUserLocation from '../lib/getUserLocation';
import geocode from '../lib/geocode';

const db = firebaseService.firestore();

export default {
    components: {
        Loader,
        GoogleMap,
    },

    data: () => ({
        page: {
            isLoading: true,
            errorMessage: null,
        },
        map: {
            searchTerm: '',
            center: {
                latitude: 51.508,
                longitude: 0.1281,
            },
        },
        userLocation: null,
        chargeLocations: [],
        geocoder: null,
    }),

    computed: {
        pins() {
            this.chargeLocations.forEach(location => {
                location.icon =
                    'https://cdn1.iconfinder.com/data/icons/maps-and-navigation-11/24/pin-style-map-park-navigation-three-maps-skate-gps-skateboard-32.png';
                location.popUp = location.description || 'Charge Location';
            });
            const pins = [...this.chargeLocations];
            if (this.userLocation)
                pins.push({
                    location: this.userLocation,
                    title: 'Your Location',
                });
            return pins;
        },
    },

    methods: {
        async loadPins() {
            const querySnapshot = await db.collection('charge-locations').get();
            this.chargeLocations = [];
            querySnapshot.forEach(doc => this.chargeLocations.push(doc.data()));
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
        async lookUpLocation() {
            if (!this.map.searchTerm) return;
            try {
                const place = await geocode(
                    { address: this.map.searchTerm },
                    this.geocoder
                );
                this.map.center = {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                };
            } catch (err) {
                this.page.errorMessage = err.message;
            }
        },
    },

    async created() {
        this.page.isLoading = true;
        try {
            const googleService = await loadGoogleMaps();
            this.geocoder = new googleService.maps.Geocoder();
            this.goToCurrentLocation();
            await this.loadPins();
        } catch (err) {
            this.page.errorMessage = err.message;
        } finally {
            this.page.isLoading = false;
        }
    },
};
</script>

<style lang="scss">
.Map {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__alert {
        width: 100%;
        margin: 0 !important;
    }

    // override to keep search field from growing
    .v-input {
        flex-grow: 0;
    }

	&__map {
		width: 100%;
		height: 100%;
	}

    &__search {
        width: 100%;
    }

    &__inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
