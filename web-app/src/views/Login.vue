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
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        page: {
            isSubmitting: false,
        },
    }),
    computed: {
        ...mapGetters({
            user: 'account/user',
        }),
        nextRoute() {
            return this.$route.query.redirect || { name: 'map' };
        },
    },
    methods: {
        ...mapActions({
            logIn: 'account/logIn',
        }),
        async onLoginClick() {
            this.page.isSubmitting = true;
            try {
                await this.logIn();
            } catch (err) {
                this.$toasted.error(err.message);
            } finally {
                this.page.isSubmitting = false;
            }
        },
    },
    watch: {
        user() {
            if (this.user) this.$router.replace(this.nextRoute);
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
