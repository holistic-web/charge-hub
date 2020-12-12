<template>
    <section class="App">
        <h1>Charge Hub - Coming Soon!</h1>

        <img class="App__image" alt="Charge Hub" src="./assets/onewheel.png" />

        <google-map class="App__map" />
    </section>
</template>

<script>
import GoogleMap from './components/GoogleMap';

export default {
    components: {
        GoogleMap,
    },
};
</script>

<style lang="scss">
body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.App {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;

    &__image {
        width: 50%;
    }

    &__map {
        width: 50%;
        height: 400px;
    }
}
</style>
