<template>
  <div>
    <b-form class="container mt-5">
        
      <b-form-group id="input-group-1" label="Nombre Juguete" label-for="input-1">
        <b-form-input id="input-1" v-model="nombre" placeholder="Nombre Juguete"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Stock" label-for="input-2">
        <b-form-input id="input-2" v-model="stock" required placeholder="Stock" type="number"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Precio" label-for="input-3">
        <b-form-input id="input-3" v-model="precio" required placeholder="Precio" type="number"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mx-2" @click.prevent="agregar">Agregar</b-button>
      <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import {db} from "../main";



export default {
  name: "Agregar",
  data() {
      return {
          nombre: '',
          stock: 0,
          precio: 0,
      }
  },
  methods: {
      agregar(){
        this.$confirm('¿Estás seguro que deseas agregar el juguete seleccionado?', 'Cuidado', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }).then(() => {
          db.collection('juguetes').add({
             Nombre: this.nombre,
             Stock: this.stock,
             Precio: this.precio,
          }),
          this.$router.push('/lista');
          this.$message({
            type: 'success',
            message: 'Juguete Agregado.'
          });
        }).catch(() => {
          console.log('Se produjo un error al agregar el juguete.')
        });
      }
  }
};
</script>

<style>
</style>