<template>
    <div class="Burger">
        <v-icon large>mdi-menu</v-icon>
    </div>
</template>

<style lang="scss">
@import '../styles';

.Burger {
    @extend .floating-action-button;
    padding: 0 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
