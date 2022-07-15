import Vue from 'vue';

export default {
    setSearchValue(state, value) {
        state.search.searchValue = value;
    },
    setPage(state, value) {
        state.search.page = value;
    },
    setPerPage(state, value) {
        state.search.perPage = value;
    },
    setItems(state, payload) {
        state.items = payload;
    },
    setCurrentItem(state, payload) {
        state.item = payload;
    },
    setTotalRecords(state, total) {
        state.totalRecords = total;
    },
}