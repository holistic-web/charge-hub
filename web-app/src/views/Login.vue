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
    </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data: () => ({
        page: {
            isSubmitting: false,
        },
    }),
    methods: {
        ...mapActions({
            logIn: 'account/logIn',
        }),
        async onLoginClick() {
            this.page.isSubmitting = true;
            try {
                await this.logIn();
                this.$router.push({ name: 'map' });
            } catch (err) {
                this.$toasted.error(err.message);
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
