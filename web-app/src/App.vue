<template>
    <v-app class="App">
        <v-main>
            <router-view />
        </v-main>

        <nav-bar v-if="showNavBar" />
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
    computed: {
        showNavBar() {
            if (this.$route.name === 'login') return false;
            return true;
        },
    },
};
</script>

<style lang="scss">
// Fixes what seems to be a bug in vuetify input widths:
.v-text-field--full-width {
    width: 100%;
}

.App {
    width: 100%;
}
</style>
