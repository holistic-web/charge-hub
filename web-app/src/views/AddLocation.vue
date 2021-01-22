<template>
	<section class="AddLocation">

		<edit-location v-model="location"/>

		{{location}}

	</section>
</template>

<script>
import EditLocation from '../components/EditLocation';

export default {
	data: () => ({
        location: {

		}
    }),
	components: {
		EditLocation
	}
}
</script>

<style lang="scss">
.AddLocation {
	padding: 1rem;
}
</style>