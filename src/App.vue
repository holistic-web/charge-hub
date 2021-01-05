<template>
	<div id="app">
		<el-layout
			title="Charge Hub"
			subtitle="So you can keep on riding 🤙">

			<google-map
				v-if="false"
				class="App__map"
				:center="center"
				:pins="pins"/>

			<new-location-form/>

			<el-taskbar>
				<el-button>+ Add Charge Location</el-button>
			</el-taskbar>

		</el-layout>
	</div>
</template>

<script>
import { ElLayout, ElTaskbar, ElButton } from '@holistic-web/el-layout';
import GoogleMap from './components/GoogleMap.vue';
import NewLocationForm from './components/NewLocationForm.vue';
import firebaseService from './lib/firebaseService';
import getUserLocation from './lib/getUserLocation';

const db = firebaseService.firestore();


export default {
	name: 'App',
	components: {
		ElLayout,
		GoogleMap,
		ElTaskbar,
		ElButton,
		NewLocationForm
	},
	data() {
		return {
			center: { latitude: 51.537762, longitude: -0.023270 },
			pins: []
		};
	},
	methods: {
		async loadPins() {
			const querySnapshot = await db.collection('charge-locations').get();
			querySnapshot.forEach(doc => this.pins.push(doc.data()));
		}
	},
	async created() {
		this.loadPins();
		this.center = await getUserLocation();
	}
};
</script>

<style lang="scss">
#app {
	font-family: 'Fira Code', monospace;
}

.App {

	&__map {
		// this fix height accounts for the taskbar
		//TODO: update to support mobile also
		height: calc(100% - 64px);
	}
}
</style>
