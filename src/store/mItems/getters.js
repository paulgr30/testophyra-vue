export default {
	items: state => Object.values(state.items),
	currentitem: state => state.item,
	totalRecords: state => state.totalRecords,
	numberPages: state => state.totalRecords > 0 ? Math.ceil(state.totalRecords / state.search.perPage) : 1,
	currentPage: state => state.search.page,
}