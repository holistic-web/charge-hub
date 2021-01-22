<template>
    <section class="User">
        <v-card v-if="user" class="User__card">
            <v-img
				class="User__card__image"
				v-if="user.photoURL"
                :src="user.photoURL"
            ></v-img>

            <v-card-title v-text="user.displayName"/>

            <v-card-subtitle v-text="user.email"/>
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
import firebaseService from '../lib/firebaseService';

export default {
    data: () => ({
        page: {
            isSubmitting: false,
		},
		user: null
    }),

    methods: {
        async onLogoutClick() {
            this.page.isSubmitting = true;
            await firebaseService.auth().signOut();
            window.localStorage.removeItem('user');
            this.$router.push({ name: 'login' });
            this.page.isSubmitting = false;
        },
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem('user'));
	}
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
