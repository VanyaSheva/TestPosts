import './assets/scss/main.scss';
import Vue from 'vue'
import {store} from './store';
import App from './App.vue'
import {router} from './router';


Vue.component('main-template', App);

new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

