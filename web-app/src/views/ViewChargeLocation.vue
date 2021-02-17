<template>
    <section class="ViewChargeLocation">
        <template v-if="chargeLocation">
            <p v-text="chargeLocation.name" />
            <google-map
                class="ViewChargeLocation__map"
                :center="chargeLocation.location"
                :zoom="19"
                :pins="pins"
            />
        </template>
        <loader v-else />
    </section>
</template>

<script>
import GoogleMap from '../components/GoogleMap';
import Loader from '../components/Loader';
import { mapActions, mapGetters } from 'vuex';

// hard coded to Leon Bankside
const DEFAULT_LOCATION = {
    latitude: 51.506521809858164,
    longitude: -0.09953073735887052,
};

export default {
    components: {
        GoogleMap,
        Loader,
    },
    data: () => ({
        map: {
            center: DEFAULT_LOCATION,
        },
    }),
    computed: {
        ...mapGetters({
            chargeLocation: 'charge-locations/detail',
        }),
        id() {
            return this.$route.params.id;
        },
        pins() {
            return [
                {
                    ...this.chargeLocation,
                },
            ];
        },
    },
    methods: {
        ...mapActions({
            fetchChargeLocation: 'charge-locations/fetchDetail',
        }),
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                this.fetchChargeLocation(this.id);
            },
        },
    },
};
</script>

<style lang="scss">
.ViewChargeLocation {
    > * {
        margin-bottom: 1rem;
    }

    &__map {
        height: 250px;
    }
}
</style>
