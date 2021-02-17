<template>
    <section class="User">
        <v-card v-if="displayUser" class="User__card">
            <v-img
                class="User__card__image"
                v-if="displayUser.photoURL"
                :src="displayUser.photoURL"
            ></v-img>

            <v-card-title v-text="displayUser.displayName" />

            <v-card-subtitle v-text="displayUser.email" />
        </v-card>

        <v-btn
            :disabled="page.isSubmitting"
            block
            v-text="'Logout'"
            @click="onLogoutClick"
        />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        page: {
            isSubmitting: false,
        },
    }),
    computed: {
        ...mapGetters({
            auth: 'account/auth',
            user: 'account/user',
        }),
        displayUser() {
            return {
                ...this.user,
                ...this.auth,
            };
        },
    },
    methods: {
        ...mapActions({
            logOut: 'account/logOut',
        }),
        async onLogoutClick() {
            this.page.isSubmitting = true;
            await this.logOut();
            this.$router.push({ name: 'login' });
            this.page.isSubmitting = false;
        },
    },
};
</script>

<style lang="scss">
.User {
    width: 100%;

    &__card {
        margin-bottom: 1rem;

        &__image {
            width: 100%;
        }
    }
}
</style>
