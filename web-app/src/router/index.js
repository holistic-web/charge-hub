import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Map from '../views/Map';
import User from '../views/User';
import Login from '../views/Login';
import AddChargeLocation from '../views/AddChargeLocation';
import ViewChargeLocation from '../views/ViewChargeLocation';

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
        meta: { public: true },
    },
    {
        path: '/charge-location/new',
        name: 'charge-location-new',
        component: AddChargeLocation,
    },
    {
        path: '/charge-location/:id',
        name: 'charge-location',
        component: ViewChargeLocation,
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
    const auth = await store.getters['account/auth'];
    if (!auth) return next({ name: 'login', query: { redirect: to.fullPath } });
    return next();
});

export default router;
