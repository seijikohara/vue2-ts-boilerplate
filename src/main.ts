import * as Vue from "vue";
import * as Router from "vue-router";
import Home from "./home/home.index";
import Todo from "./todo/todo.index";

declare function require(path: string): any;

Vue.use(Router);
let app = require('./App.vue');
app.router = new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {path: '/home', component: Home},
        {path: '/todo', component: Todo},
        {path: '*', redirect: '/home'}
    ]
});
new Vue(app).$mount('#app');
