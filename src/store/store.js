import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/router';
import {db} from "../main";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguetes: [],
  },
  getters:{
    mostrandoJuguetes(state){
      return state.juguetes;
    }
  },
  mutations: {
    mutandoJuguetes(state,arreglo){
      state.juguetes = arreglo;
    }
  },
  actions: {
    traigoJuguetes({commit}){
      db.collection('juguetes').onSnapshot(resp =>{
        let arreglo = [];
        resp.forEach(elemento => {
          arreglo.push({
            id: elemento.id,
            nombre: elemento.data().Nombre,
            stock: elemento.data().Stock,
            precio: elemento.data().Precio,
          });
        });
        commit('mutandoJuguetes',arreglo);
      })
    },
    actualizandoJuguete(context,juguete){
      db.collection('juguetes').doc(juguete.id).update({
        Nombre: juguete.nombre,
        Stock: juguete.stock,
        Precio: juguete.precio,
      })
      router.replace('/lista');
    },
    eliminajuguete(context,id){
      console.log(id);
      db.collection('juguetes').doc(id).delete().then(resp =>{
        console.log('Se elimino el juguete.');
        console.log(resp);
      }).catch(error =>{
        console.log(error);
        console.log('Oops... error al eliminar.');
      })
    }
  },
})
