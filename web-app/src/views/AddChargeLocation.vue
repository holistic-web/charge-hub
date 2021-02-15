<template>
    <section class="AddChargeLocation">
        <edit-charge-location v-model="chargeLocation" />

        <v-btn
            class="AddChargeLocation__button"
            :disabled="isSubmitButtonDisabled"
            color="primary"
            v-text="'Create'"
            large
            block
            @click="onSubmitClick"
        />
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import EditChargeLocation from '../components/EditChargeLocation';

// hard coded to Leon Bankside
const DEFAULT_LOCATION = {
    latitude: 51.506521809858164,
    longitude: -0.09953073735887052,
};

export default {
    data: () => ({
        page: {
            isSubmitting: false,
        },
        chargeLocation: { location: DEFAULT_LOCATION },
    }),
    components: {
        EditChargeLocation,
    },
    computed: {
        isSubmitButtonDisabled() {
            if (!this.chargeLocation.name) return true;
            if (!this.chargeLocation.location) return true;
            return this.page.isSubmitting;
        },
    },
    methods: {
        ...mapActions({
            createChargeLocation: 'charge-locations/create',
        }),
        async onSubmitClick() {
            this.page.isSubmitting = true;
            await this.createChargeLocation(this.chargeLocation);
            this.$router.push({ name: 'map' });
            this.page.isSubmitting = false;
        },
    },
};
</script>

<style lang="scss">
.AddChargeLocation {
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__button {
        flex-grow: 0;
    }
}
</style>
