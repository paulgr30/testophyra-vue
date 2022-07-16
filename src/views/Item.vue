<template>
  <div>
    <b-modal
      id="modalItem"
      ref="modalItem"
      :title="titleModal"
      hide-header-close
      no-close-on-backdrop
      body-class="position-static"
      size="lg"
      button-size="sm"
      cancel-title="Cancelar"
      cancel-variant="dark"
      ok-title="Aceptar"
      ok-variant="primary"
      @ok.prevent="save"
      @show="loadItem"
    >
      <!-- Overlay -->
      <b-overlay :show="showOverlay" no-wrap rounded>
        <template #overlay>
          <b-spinner></b-spinner>
          <strong class="ml-2 fs-4">Procesando...</strong>
        </template>
      </b-overlay>

      <ValidationObserver ref="vdtObserver" v-slot="{ handleSubmit }">
        <b-form
          id="frmItem"
          name="frmItem"
          autocomplete="off"
          @submit.stop.prevent="handleSubmit(save)"
          novalidate
        >
          <b-row>
            <b-col md="6">
              <!-- Imagen -->
              <b-row>
                <!-- Previsualizacion Imagen -->
                <b-col>
                  <div>Imagen</div>
                  <div class="image-wrapper">
                    <img id="picture" ref="picture" :src="image" />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <!-- Carga Imagen -->
                <b-col>
                  <b-form-file
                  id="file"
                  ref="file"
                  accept="image/jpeg, image/png"
                  browse-text="Seleccionar"
                  placeholder="Seleccione una imagen..."
                  drop-placeholder="Arrastre una imagen aqui..."
                  @change="imagePreview"
                />
                <span v-if="submitted && imageError" class="text-danger">
                  {{ imageError }}
                </span>

                <p class="mt-2">
                  Por favor solo seleccione archivos de imagen con formato JPEG o PNG.
                </p>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="6">
              <!-- Titulo -->
              <ValidationProvider
                vid="title"
                name="Titulo"
                :rules="{ required: true, max: 100 }"
                v-slot="{ errors }"
              >
                <b-form-group label="Titulo">
                  <b-form-input
                    type="text"
                    placeholder="Ingresar titulo"
                    maxlength="100"
                    v-model="item.title"
                    :class="{ 'is-invalid': submitted && errors[0] }"
                  />
                  <span v-if="submitted && errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Descripcion -->
              <ValidationProvider
                vid="description"
                name="Descripcion"
                :rules="{ required: true, max: 200 }"
                v-slot="{ errors }"
              >
                <b-form-group label="Descripcion">
                  <b-form-input
                    id="email"
                    type="text"
                    placeholder="Ingresar descripcion"
                    maxlength="200"
                    v-model="item.description"
                    :class="{ 'is-invalid': submitted && errors[0] }"
                  />
                  <span v-if="submitted && errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Precio -->
              <ValidationProvider
                vid="price"
                name="Precio"
                :rules="{ required: true, min_value: 1, double: true }"
                v-slot="{ errors }"
              >
                <b-form-group label="Precio">
                  <b-form-input
                    type="number"
                    placeholder="Ingresar precio"
                    v-model="item.price"
                    :class="{ 'is-invalid': submitted && errors[0] }"
                  />
                  <span v-if="submitted && errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: false,
      submitted: false,
      item: {},
      image: null,
      imageError: "",
      hasImage:false,
    };
  },
  computed: {
    titleModal() {
      return this.item.id ? "EDITAR ITEM" : "AGREGAR ITEM";
    },
    showMessageAndClean() {
      this.$services.toastSuccess(this);

      if (this.item.id) {
        this.$refs.modalItem.hide();
      }
      this.item = {};
      this.$refs.vdtObserver.reset();
      this.submitted = false;
    },
  },
  methods: {
    loadItem() {
      this.submitted = false;
      this.hasImage = false;
      this.item = JSON.parse(JSON.stringify(this.$store.getters["mItems/currentItem"]));

      //if(this.item.id) {
        this.loadImage();
      /*} else {
        this.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWknGAoHFzmh-h5njt4tAWMqtBQbcKfirS2rvX8cYGaDEE_ZMkKD9aBh2uQn8EWyFBWkM&usqp=CAU";
      }*/
    },

    imagePreview(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      this.image = file;
      this.imageError = "";

      reader.onload = (ev) => {
        this.$refs.picture.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      this.hasImage = true;
    },
    loadImage() {
      if (this.item.image) {
        this.image = process.env.VUE_APP_IMAGE_URL + this.item.image;
        this.hasImage = true;
      } else {
        this.image =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWknGAoHFzmh-h5njt4tAWMqtBQbcKfirS2rvX8cYGaDEE_ZMkKD9aBh2uQn8EWyFBWkM&usqp=CAU";
        this.hasImage = false;
      }
    },

    async save() {
      this.imageError = "";
      this.showOverlay = true;
      this.submitted = true;
      try {
        this.imageError = this.hasImage == true ? "" : "El campo imagen es obligatorio";
        let success = await this.$refs.vdtObserver.validate();
        if (!success) return;
        if(this.imageError) return

        let frmData = new FormData();
        
        if (this.item.id) {
          frmData.append("id", this.item.id);
        }
        frmData.append("title", this.item.title);
        frmData.append("description", this.item.description);
        frmData.append("price", this.item.price);
        frmData.append("image", this.image);

        await this.$store.dispatch("mItems/addOrUpdate", frmData);
        this.showMessageAndClean;
      } catch (err) {
        if (err.code == 422) {
          this.$refs.vdtObserver.setErrors(err.errors);
        } else {
          this.$services.swalDanger(
            "Ocurrio un problema",
            err.statusText + " - " + err.message
          );
        }
      } finally {
        this.showOverlay = false;
      }
    },
  },
};
</script>

<style scoped>
.image-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
}

.image-wrapper img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>