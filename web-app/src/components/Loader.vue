<template>
    <v-icon class="Loader" x-large>mdi-loading</v-icon>
</template>

<style lang="scss">
.Loader {
    width: 64px;
    height: 64px;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
