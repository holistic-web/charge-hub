<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>

        <nav-bar />
    </v-app>
</template>

<script>
import NavBar from './components/NavBar';
export default {
    name: 'App',

    components: {
        NavBar,
    },

    data: () => ({}),
};
</script>

<style lang="scss">
// Fixes what seems to be a bug in vuetify input widths:
.v-text-field {
    &--full-width {
        width: 100%;
    }
}
</style>
