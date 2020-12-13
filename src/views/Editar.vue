<template>
  <div>
    <b-form class="container mt-5">
      <b-form-group
        id="input-group-1"
        label="Nombre Juguete"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="juguete.nombre"
          placeholder="Nombre Juguete"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Stock" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="juguete.stock"
          required
          placeholder="Stock"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Precio" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="juguete.precio"
          required
          placeholder="Precio"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="mx-2"
        @click.prevent="actualizar"
        >Actualizar</b-button
      >
      <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Editar",
  data() {
    return {
      juguete: {
        nombre: "",
        stock: 0,
        precio: 0,
        id: "",
      },
    };
  },
  created() {
    let juguete = {};
    juguete = this.$store.getters.mostrandoJuguetes.find(
      (resp) => resp.id === this.$route.params.id
    );
    if (juguete) {
      this.juguete.nombre = juguete.nombre;
      this.juguete.stock = juguete.stock;
      this.juguete.precio = juguete.precio;
      this.juguete.id = juguete.id;
    } else {
      console.log("No se cargo el jueguete");
    }
  },
  methods: {
    actualizar() {
      this.$confirm(
        "¿Estás seguro que deseas editar el juguete seleccionado?",
        "Cuidado",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Juguete Editado.",
          });
          this.$store.dispatch("actualizandoJuguete", this.juguete);
        })
        .catch(() => {
          console.log("Se produjo un error al editar el juguete.");
        });
    },
  },
};
</script>

<style>
</style>