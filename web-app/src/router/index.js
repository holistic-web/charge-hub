import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Map from '../views/Map';
import User from '../views/User';
import Login from '../views/Login';
import AddLocation from '../views/AddLocation';

Vue.use(VueRouter);

const routes = [
	{
		path: '/map',
		name: 'map',
		component: Map,
	},
	{
		path: '/user',
		name: 'user',
		component: User,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { public: true }
	},
	{
		path: '/add-location',
		name: 'add-location',
		component: AddLocation,
	},
	{
		path: '*',
		redirect: { name: 'map' },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (to.meta.public) return next();
	const user = await store.getters['account/user'];
	if (!user) return next({ name: 'login', query: { redirect: to.fullPath } });
	return next();
});

export default router;
