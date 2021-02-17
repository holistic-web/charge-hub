<template>
    <nav class="NavBar">
        <nav-bar-icon
            v-for="menuItem in menuItems"
            :key="menuItem.text"
            :to="menuItem.to"
            :text="menuItem.text"
            :image="menuItem.image"
        />
    </nav>
</template>

<script>
import NavBarIcon from './NavBarIcon';

export default {
    components: {
        NavBarIcon,
    },
    data: () => ({
        menuItems: [
            {
                to: { name: 'charge-location-new' },
                text: 'Add Point',
                image: 'https://i.imgur.com/ozOhQTP.png',
            },
            {
                to: { name: 'map' },
                text: 'Map',
                image: 'https://i.imgur.com/kJhP2cj.png',
            },
            {
                to: { name: 'user' },
                text: 'Profile',
                image: 'https://i.imgur.com/Hi2p7F6.png',
            },
        ],
    }),
};
</script>

<style lang="scss">
.NavBar {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.25rem 0.2rem;
}
</style>
