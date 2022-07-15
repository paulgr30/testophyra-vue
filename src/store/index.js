import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { mItems } from "./mItems";

const store = new Vuex.Store({
  /* Evita que mutes el estado directamente,
    por lo que solo se puede mutar el estado usando mutaciones.*/
  strict: true,

  // Agregamos los modulos
  modules: {
    namespaced: true,
    mItems,
  },
});

Vue.store = store;
export default store;