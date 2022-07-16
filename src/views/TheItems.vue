<template>
  <div class="px-md-5">
    <b-card no-body class="pt-3 pb-2 px-4">
      <b-row>
        <b-col cols="6">
          <!-- Titulo -->
          <h5 class="text-left">
            <b-icon icon="list-check" font-scale="1.2" class="mr-md-1" />
            Items
          </h5>
        </b-col>

        <b-col cols="6">
          <!-- Boton Agregar -->
          <div class="d-flex justify-content-end">
            <b-button
              variant="primary"
              size="sm"
              @click="setItem()"
              v-b-modal.modalItem
            >
              <b-icon icon="plus-lg" font-scale="0.9" class="mr-md-1" />
              <span class="d-none d-md-inline">Agregar Item</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mb-2 elevation-0" style="height: 415px !important">
      <!-- Formulario de Busqueda -->
      <b-form autocomplete="off" @submit.prevent="searchData" novalidate>
        <b-input-group size="md" prepend="Buscar" class="mb-3">
          <b-form-input
            name="txtSearch"
            type="search"
            placeholder="Ingrese titulo a buscar"
            v-model="searchValue"
          />
        </b-input-group>
      </b-form>

      <!-- OverlayDelete -->
      <b-overlay :show="showOverlay" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <b-icon icon="trash" font-scale="2" variant="danger" />
            <h6 class="text-danger">Eliminando...</h6>
          </div>
        </template>

        <!-- Tabla de Datos -->
        <b-table
          fixed
          small
          hover
          sticky-header
          show-empty
          responsive
          :busy="isLoading"
          :fields="fields"
          :items="items"
        >
          <!-- Loading -->
          <template #table-busy>
            <div class="text-center text-primary py-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong>&nbsp;Consultando...</strong>
            </div>
          </template>

          <!-- Empty -->
          <template #empty>
            <h5 class="text-center py-5">No hay datos para mostrar</h5>
          </template>

          <!-- Mostrar Imagen -->
          <template #cell(image)="{ item }">
            <img id="picture" ref="picture" :src="showImage(item.image)" width="70" />
          </template>

          <!-- Botonera Tabla -->
          <template #cell(opciones)="{ item }">
            <!-- Boton Editar -->
            <b-link
              class="mr-4 text-center"
              @click="setItem(item)"
              v-b-modal.modalItem
            >
              <b-icon icon="pencil-square" scale="1.5" variant="info" />
            </b-link>

            <!-- Boton Eliminar -->
            <b-link class="text-center" @click="remove(item.id)">
              <b-icon icon="trash" scale="1.5" variant="danger" />
            </b-link>
          </template>
        </b-table>
      </b-overlay>
    </b-card>

    <b-row>
      <!-- Estadisticas de Paginacion -->
      <b-col md="6" sm="12">
        <div class="py-2 pt-md-2 text-center text-md-left">
          Pagina {{ page }} de {{ pages }} - {{ total }} resultados
        </div>
      </b-col>

      <!-- Paginador -->
      <b-col md="6" sm="12">
        <div>
          <b-pagination-nav
            :number-of-pages="pages"
            :link-gen="linkGen"
            :no-page-detect="true"
            size="sm"
            v-model="page"
            first-number
            last-number
            use-router
            @page-click="loadItems"
            class="d-flex justify-content-center justify-content-md-end"
          />
        </div>
      </b-col>
    </b-row>

    <item />
  </div>
</template>

<script>
// @ is an alias to /src
import item from "./Item.vue";

export default {
  name: "TheItems",
  components: {
    item,
  },
  data() {
    return {
      showOverlay: false,
      isLoading: false,
      searchValue: null,
    };
  },
  computed: {
    items() {
      return this.$store.getters["mItems/items"];
    },
    total() {
      return this.$store.getters["mItems/totalRecords"];
    },
    pages() {
      return this.$store.getters["mItems/numberPages"];
    },
    page: {
      get() {
        return this.$store.getters["mItems/currentPage"];
      },
      set(value) {
        this.$store.dispatch("mItems/setPage", value);
      },
    },
    fields() {
      return [
        {
          key: "image",
          label: "Imagen",
          //sortable: true,
          thStyle: "width:100px;",
        },
        {
          key: "title",
          label: "Titulo",
          thClass: "text-left",
          tdClass: "text-left",
          thStyle: "width:200px;",
        },
        {
          key: "description",
          label: "Descripcion",
          thClass: "text-left",
          tdClass: "text-left",
          thStyle: "width:500px;",
        },
        {
          key: "price",
          label: "Precio",
          thStyle: "width:70px;",
        },
        {
          key: "opciones",
          label: "",
          tdClass: "text-right pr-3",
          thStyle: "width:80px;",
        },
      ];
    },
  },
  methods: {
    async loadItems(e, page = 1) {
      this.page = page;
      this.isLoading = true;
      try {
        await this.$store.dispatch("mItems/getByCriteria");
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    searchData() {
      this.$store.dispatch("mItems/setSearchValue", this.searchValue);
      this.loadItems();
    },
    setItem(item = {}) {
      this.$store.dispatch("mItems/setItem", item);
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    showImage(image) {
      if (image) {
        image = process.env.VUE_APP_IMAGE_URL + image;
      } else {
        image =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWknGAoHFzmh-h5njt4tAWMqtBQbcKfirS2rvX8cYGaDEE_ZMkKD9aBh2uQn8EWyFBWkM&usqp=CAU";
        this.hasImage = false;
      }
      return image;
    },
    async remove(id) {
      this.showOverlay = true;
      let response = await this.$services.swalConfirmDelete();
      if (response.isConfirmed) {
        try {
          await this.$store.dispatch("mItems/destroy", id);
          this.$services.toastSuccess(this);
        } catch (err) {
          this.$services.swalDanger(
            "Ocurrio un problema",
            err.statusText + " - " + err.message
          );
        }
      }
      this.showOverlay = false;
    },
  },
  created() {
    this.$store.dispatch("mItems/setSearchValue", "");
    this.loadItems();
  },
};
</script>
