import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      login: true
    },
  },
  
  {
    path: '/lista',
    name: 'Lista',
    component: () => import(/* webpackChunkName: "lista" */ '../views/Lista.vue'),
    meta: {
      login: true
    },
  },
  {
    path: '/sinstock',
    name: 'SinStock',
    component: () => import(/* webpackChunkName: "lista" */ '../views/SinStock.vue'),
    meta: {
      login: true
    },
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue'),
    meta: {
      login: true
    },
  },
  {
    path: '/agregandojuguete',
    name: 'AgregarJuguete',
    component: () => import(/* webpackChunkName: "agregandojuguete" */ '../views/AgregarJuguete.vue'),
    meta: {
      login: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  var usuario = firebase.auth().currentUser;
  
  let registroRequerido = to.matched.some(ruta => ruta.meta.login)
  console.log(registroRequerido);

  if (registroRequerido && !usuario) {
      next('/');
  } else {
    setTimeout(() => {next()},1000)
  }
})

export default router
