<template>
    <router-link class="NavBarIcon" :to="{ name: 'map' }">
        <img class="NavBarIcon__image" :src="image"/>
        <span v-text="text"/>
    </router-link>
</template>


<script>
export default {
    props: {
        to: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    }
}  

</script>

<style lang="scss">
.NavBarIcon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    width: 100%;

    &.router-link-active {
        font-weight: bold;
    }
    &__image {

    }
}
</style>