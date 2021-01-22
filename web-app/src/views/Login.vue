<template>
    <section class="Login">
        <v-btn
            :disabled="page.isSubmitting"
            depressed
            color="primary"
            large
            v-text="'Login'"
			@click="onLoginClick"
        />
        <v-alert
            v-if="page.errorMessage"
            type="error"
            v-text="page.errorMessage"
            dismissible
        />
    </section>
</template>

<script>
import firebaseService from '../lib/firebaseService';

export default {
    data: () => ({
        page: {
            isSubmitting: false,
            errorMessage: null,
        },
    }),
    methods: {
        async onLoginClick() {
            this.page.isSubmitting = true;
            try {
				const provider = new firebaseService.auth.GoogleAuthProvider();
				firebaseService.auth().setPersistence(firebaseService.auth.Auth.Persistence.LOCAL);
				const user = await firebaseService.auth().signInWithPopup(provider);
				window.localStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ name: 'Map' });
            } catch (err) {
                this.page.errorMessage = err.message;
            } finally {
                this.page.isSubmitting = false;
            }
        },
    },
};
</script>

<style lang="scss">
.Login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
