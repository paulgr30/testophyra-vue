import Vue from "vue";

export default {
  setItem({ commit }, data) {
    commit("setCurrentItem", data);
  },
  setPerPage({ commit }, perPage) {
    commit("setPerPage", perPage);
  },
  setSearchValue({ commit }, data) {
    commit("setSearchValue", data);
  },
  setPage({ commit }, data) {
    commit("setPage", data);
  },

  async getByCriteria({ state, commit }) {
    try {
      commit("setItems", {});
      let response = await Vue.axios.get("items/bycriteria", {
        params: state.search,
      });
      if (response) {
        commit("setItems", response.data.data);
        commit("setTotalRecords", response.data.total);
      }
    } catch (err) {
      console.log(err);
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
      };
      throw error;
    }
  },
  async addOrUpdate({ dispatch }, data) {
    try {
      data.id
        ? await Vue.axios.put("items/" + data.id, data)
        : await Vue.axios.post("items", data);

      await dispatch("getByCriteria");
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async destroy({ state, dispatch }, id) {
    try {
      await Vue.axios.delete("items/" + id);
      dispatch("getByCriteria");
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
};
