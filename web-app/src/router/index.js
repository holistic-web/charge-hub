import Vue from 'vue';
import VueRouter from 'vue-router';
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

router.beforeEach((to, from, next) => {
	const user = window.localStorage.getItem('user');
	if (to.name !== 'login' && !user) next({ name: 'login' });
	next();
});

export default router;
