<template>
  <div class="container text-center mt-5">
      <h1>SIN STOCK</h1>
    <table class="table" v-for="(item, index) in datosjuguetes" :key="index">
      <thead v-if="(item.stock <= 0)">
        <tr>
          <th scope="col">Codigo</th>
          <th scope="col">Nombre Juguete</th>
          <th scope="col">Stock</th>
          <th scope="col">Precio</th>
          <th scope="col">Editar o Eliminar</th>
        </tr>
      </thead>
      <tbody v-if="(item.stock <= 0)">
        <tr>
          <th scope="row">{{item.id}}</th>
          <td>{{item.nombre}}</td>
          <td>{{item.stock}}</td>
          <td>${{item.precio}}</td>
          <td>
            <b-button variant="success" class="mx-2" @click.prevent="editarJuguete(item.id)">Editar</b-button>
            <b-button variant="danger" class="mx-2" @click.prevent="eliminarJuguete(item.id)">Eliminar</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-button variant="success" class="mx-2" @click.prevent="volver">Regresar</b-button>
  </div>
</template>

<script>
export default {
  name: "Inventario",
  data() {
    return {
    }
  },
  methods: {
    agregar(){
      this.$router.push('/agregandojuguete');
    },
    volver(){
      this.$router.push('/lista');

    },
    editarJuguete(id){
      this.$router.push({name: 'Editar', params: {id: id}});
    },
    eliminarJuguete(id){
        this.$confirm('¿Estás seguro que deseas eliminar al usuario seleccionado?', 'Cuidado', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Usuario Eliminado.'
          });
          this.$store.dispatch('eliminajuguete',id);
        }).catch(() => {
          console.log('Se produjo un error al eliminar al usuario.')
        });
    }
  },
  mounted() {
    this.$store.dispatch('traigoJuguetes');
  },
  computed: {
    datosjuguetes(){
      return this.$store.getters.mostrandoJuguetes
    }
  },
};
</script>

<style>
</style>
