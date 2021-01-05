<template>
	<div id="app">
		<el-layout>

			<template v-slot:header>
				<el-header
					class="ElLayout__header"
					title="Charge Hub 🤙">

					<template v-slot:right>
						<div>
							<el-button
								v-if="user"
								v-text="'Logout'"/>
							<el-button
								v-else
								v-text="'Login'"
								@click="onLoginClick"/>
						</div>
					</template>

				</el-header>
			</template>

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
import { ElLayout, ElHeader, ElTaskbar, ElButton } from '@holistic-web/el-layout';
import GoogleMap from './components/GoogleMap.vue';
import NewLocationForm from './components/NewLocationForm.vue';
import firebaseService from './lib/firebaseService';
import getUserLocation from './lib/getUserLocation';

const db = firebaseService.firestore();


export default {
	name: 'App',
	components: {
		ElLayout,
		ElHeader,
		GoogleMap,
		ElTaskbar,
		ElButton,
		NewLocationForm
	},
	data() {
		return {
			center: { latitude: 51.537762, longitude: -0.023270 },
			pins: [],
			user: null
		};
	},
	methods: {
		async loadPins() {
			const querySnapshot = await db.collection('charge-locations').get();
			querySnapshot.forEach(doc => this.pins.push(doc.data()));
		},
		async onLoginClick() {
			const provider = new firebaseService.auth.GoogleAuthProvider();
			this.user = await firebaseService.auth().signInWithPopup(provider);
		},
		async onLogoutClick() {
			await firebaseService.auth().signOut();
			this.user = null;
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
