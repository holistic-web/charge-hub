import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../views/Map';
import User from '../views/User';

Vue.use(VueRouter);

const routes = [
    {
        path: '/map',
        name: 'Map',
        component: Map,
    },
    {
        path: '/user',
        name: 'User',
        component: User,
    },
    {
        path: '*',
        redirect: { name: 'Map' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
