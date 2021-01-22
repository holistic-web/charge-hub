<template>
    <v-app class="App">
        <v-main>
            <router-view />
        </v-main>

        <nav-bar v-if="showNavBar" />
    </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from './components/NavBar';
import firebaseService from './lib/firebaseService';

firebaseService.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
    } else {
        Vue.$router.push({ name: 'login' });
    }
});

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
