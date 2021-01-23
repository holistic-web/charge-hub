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
import firebaseService from '../lib/firebaseService';
import EditLocation from '../components/EditLocation';

const db = firebaseService.firestore();

export default {
    data: () => ({
        page: {
            isSubmitting: false,
        },
        location: {},
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
        async onSubmitClick() {
            this.page.isSubmitting = true;
            const newChargePointRef = db.collection('charge-locations').doc();
            await newChargePointRef.set(this.location);
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
