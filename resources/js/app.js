
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// Vue route
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// sweet aleart
import Swal from 'sweetalert2'
window.Swal=Swal;

// v-form
import { Form, HasError, AlertError } from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form=Form;

// Moment.js
import moment from 'moment';
// Progress bar
import VueProgressBar from 'vue-progressbar'
// vue page route

let routes = [
    { path: '/user-profile', component: require('./components/UserProfile.vue').default },
    { path: '/user-list', component: require('./components/UserList.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

//   Filter
Vue.filter('capitalize', function (value) {
    // if (!value) return ''
    // value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  });

// vue date moment

Vue.filter('mydate', function (create) {
    return create.moment().format('MMMM Do YYYY, h:mm:ss a');
  });

//   vue progress bar

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
  });

//   sweet alear

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  window.Toast=Toast;

// custom event

// window.Fire= new vue();


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('asidebar-components', require('./components/Sidebar.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    el: '#app'
});
