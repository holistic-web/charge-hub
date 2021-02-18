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
import { mapGetters, mapActions } from 'vuex';
import GoogleMap from '../components/GoogleMap';
import getUserLocation from '../lib/getUserLocation';
import geocode from '../lib/geocode';

// the handleMarkerClickThrough method is composed in the created() hook
const infoWindowSource = `
<div id="content">
	<h1 id="firstHeading" class="firstHeading">{{name}}</h1>
	<btn class="CTA" onclick="handleMarkerClickThrough('{{_id}}')">View Details</btn>
	<div id="bodyContent">
	{{#if description}}
		<p>{{description}}</p>
	{{/if}}
	{{#each tags}}
		<span class="Tag">#{{this}}</span>
	{{/each}}
	</div>

	<style>
		.CTA {
			color: #B098E9;
			text-decoration: underline;
			cursor: pointer;
		}
		.Tag {
			background-color: #B098E9;
			border-radius: 0.15rem;
			padding: 0.1rem 0.2rem;
		}
	</style>
</div>
`;
const infoWindowTemplate = Handlebars.compile(infoWindowSource);

// hard coded to Leon Bankside
const DEFAULT_LOCATION = {
    latitude: 51.506521809858164,
    longitude: -0.09953073735887052,
};

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
            center: DEFAULT_LOCATION,
            zoom: 12,
        },
        userLocation: null,
    }),

    computed: {
        ...mapGetters({
            chargeLocations: 'charge-locations/list',
        }),
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
        ...mapActions({
            fetchChargeLocations: 'charge-locations/fetchList',
        }),
        setCenter(center) {
            this.fetchChargeLocations({ center });
            this.map.center = center;
        },
        async goToCurrentLocation() {
            try {
                this.userLocation = await getUserLocation();
                const place = await geocode({
                    location: {
                        lat: this.userLocation.latitude,
                        lng: this.userLocation.longitude,
                    },
                });
                this.setCenter(this.userLocation);
                this.map.searchTerm = place.formatted_address;
            } catch (err) {
                this.page.errorMessage = err.message;
            }
        },
        async lookUpLocation() {
            if (!this.map.searchTerm) return;
            try {
                const place = await geocode({ address: this.map.searchTerm });
                this.setCenter({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                });
            } catch (err) {
                this.page.errorMessage = err.message;
            }
        },
    },
    async created() {
        // Wire up infowindow click handler
        window.$router = this.$router;
        window.handleMarkerClickThrough = function(chargeLocationId) {
            window.$router.push({
                name: 'charge-location',
                params: { id: chargeLocationId },
            });
        };

        this.page.isLoading = true;
        try {
            this.fetchChargeLocations({ center: this.map.center });
            this.goToCurrentLocation();
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
