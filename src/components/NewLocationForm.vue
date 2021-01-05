<template>
	<section class="NewLocationForm">

		<google-map
			class="NewLocationForm__map"
			:center="center"
			@mapClick="handleMapClick"/>

		<el-button>Get my Location</el-button>
		<el-button>Select on Maps</el-button>

		<b-form-group
			label="Location"
			label-for="newLocationForm-location">
			<b-form-input
				id="newLocationForm-location"
				v-model="searchTerm"
				size="sm"/>
		</b-form-group>

	</section>
</template>

<script>
import { ElButton } from '@holistic-web/el-layout';
import GoogleMap from './GoogleMap.vue';
import getUserLocation from '../lib/getUserLocation';

export default {
	components: {
		GoogleMap,
		ElButton
	},
	data() {
		return {
			searchTerm: null,
			center: { latitude: 38.8977, longitude: 77.0365 },
			newLocation: {
				location: null
			}
		};
	},
	methods: {
		handleMapClick(location) {
			// this.location = JSON.stringify(location);
			console.log('the location', location);

		}
	},
	async created() {
		this.center = await getUserLocation();
	}
};
</script>

<style lang="scss">

.NewLocationForm {
	display: flex;
	flex-direction: column;

	&__map {
		height: 300px;
	}
}
</style>
