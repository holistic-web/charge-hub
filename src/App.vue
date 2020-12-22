<template>
    <section class="App">
        <h1 class="App__title">Charge Hub</h1>
        {{ pins }}
        <google-map class="App__map" />
    </section>
</template>

<script>
import firebase from 'firebase';
import GoogleMap from './components/GoogleMap';

firebase.initializeApp({
    apiKey: 'AIzaSyCzrOC9Sa6UyZXbffHgjfU_5GKPTH-RHpg',
    authDomain: 'charge-hub.firebaseapp.com',
    databaseURL:
        'https://charge-hub-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'charge-hub',
    storageBucket: 'charge-hub.appspot.com',
    messagingSenderId: '760484226654',
    appId: '1:760484226654:web:a7685ea54c3d05a1c976cf',
    measurementId: 'G-64CVS8G661',
});

const db = firebase.firestore();

export default {
    components: {
        GoogleMap,
    },
    data() {
        return {
            pins: [],
        };
    },
    methods: {
        async loadPins() {
            const querySnapshot = await db.collection('charge-locations').get();
            querySnapshot.forEach((doc) => this.pins.push(doc.data()));
        },
    },
    created() {
        this.loadPins();
    },
};
</script>

<style lang="scss">
@import './styles/fonts';

body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.App {
    $titleHeight: 50px;

    font-family: $font-family;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;
    display: flex;

    &__title {
        margin: 0;
        height: $titleHeight;
        line-height: $titleHeight;
    }

    &__map {
        width: 100%;
        height: calc(100vh - #{$titleHeight});
    }
}
</style>
