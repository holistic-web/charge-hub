<template>
    <nav class="NavBar">
		<router-link class="NavBar__item" :to="{ name: 'add-location' }">
            <v-icon color="dark">mdi-map-marker-plus</v-icon>
            <span>Add Location</span>
        </router-link>

        <router-link class="NavBar__item" :to="{ name: 'map' }">
            <v-icon color="dark">mdi-google-maps</v-icon>
            <span>Map</span>
        </router-link>

		 <router-link class="NavBar__item" :to="{ name: 'user' }">
            <v-icon color="dark">mdi-skateboard</v-icon>
            <span>User</span>
        </router-link>
    </nav>
</template>

<style lang="scss">
.NavBar {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.25rem 0;

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;

        &.router-link-active {
            font-weight: bold;
        }
    }
}
</style>
