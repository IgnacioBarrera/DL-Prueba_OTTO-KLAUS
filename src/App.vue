<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand>OTTO KLAUS</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item class="nav_item" v-if="this.uid"><router-link :to="{name: 'Lista'}">Inventario</router-link></b-nav-item>
              <b-nav-item class="nav_item" v-else><router-link to="/">Login</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-button v-if="this.uid" variant="danger" class="mx-2" @click.prevent="salir">Cerrar Sesion</b-button>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

import firebase from 'firebase';

export default {
  name: 'App',
  data() {
    return {
      uid: '',
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.uid = user.uid;
        console.log('Hay usuario activo.');
        this.$router.push('/lista')
      } else {
        console.log('No hay usuarios registrados')
      }
    });
  },
  methods: {
    salir(){
      firebase.auth().signOut().then(() => {
        console.log('signOut ocurrio correctamente');
        this.$router.push("/");
        }).catch((error) => {
        console.log(error);
      });
    }
  },
}
</script>

<style scoped>
  a {
    color: white;
    font-weight: bold;
  }
</style>
