<template>
    <section class="AddLocation">
        <edit-location v-model="location" />

        <v-btn
            class="AddLocation__button"
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
import EditLocation from '../components/EditLocation';

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
        location: { location: DEFAULT_LOCATION },
    }),
    components: {
        EditLocation,
    },
    computed: {
        isSubmitButtonDisabled() {
            if (!this.location.name) return true;
            if (!this.location.location) return true;
            return this.page.isSubmitting;
        },
    },
    methods: {
        ...mapActions({
            createChargeLocation: 'charge-locations/create',
        }),
        async onSubmitClick() {
            this.page.isSubmitting = true;
            await this.createChargeLocation(this.location);
            this.$router.push({ name: 'map' });
            this.page.isSubmitting = false;
        },
    },
};
</script>

<style lang="scss">
.AddLocation {
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
