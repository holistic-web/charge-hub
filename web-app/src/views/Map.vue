<template>
    <section class="Map">
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
                <google-map
                    class="Map__map"
                    :center="map.center"
                    :zoom="map.zoom"
                    :pins="pins"
                />
            </div>
        </template>
    </section>
</template>

<script>
import Handlebars from 'handlebars';
import loadGoogleMaps from '../lib/loadGoogleMaps';
import GoogleMap from '../components/GoogleMap';
import firebaseService from '../lib/firebaseService';
import getUserLocation from '../lib/getUserLocation';
import geocode from '../lib/geocode';

const db = firebaseService.firestore();

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
                // hard coded to Leon Bankside
                latitude: 51.506521809858164,
                longitude: -0.09953073735887052,
            },
            zoom: 12,
        },
        userLocation: null,
        chargeLocations: [],
        geocoder: null,
    }),

    computed: {
        pins() {
            this.chargeLocations.forEach(pin => {
                pin.icon = 'https://i.imgur.com/lA72fbg.png';
                pin.infoWindow = infoWindowTemplate(pin);
            });
            const pins = [...this.chargeLocations];
            if (this.userLocation)
                pins.push({
                    location: this.userLocation,
                    name: 'Your Location',
                    icon: 'https://i.imgur.com/kJhP2cj.png',
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
                console.log('this.userLocation: ', this.userLocation);
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
            this.$toasted.error(err.message);
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
