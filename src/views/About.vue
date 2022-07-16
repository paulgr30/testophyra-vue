<template>
  <div>
    <b-card no-body class="mx-3 mb-3 pt-3 pb-1 px-4">
      <b-row>
        <b-col>
          <!-- Titulo -->
          <h5 class="text-left">
            <i class="nav-icon fas fa-file-alt mr-1"></i>
            Acerca del Proyecto
          </h5>
        </b-col>
      </b-row>
    </b-card>

    <b-row class="mx-1">
      <b-col md="6">
        <b-card class="text-left">
              <div class="info">
                <a href="https://www.facebook.com/paulgarcia27" class="d-block fs-2 text-dark">Paul Garcia Rojas</a>
                <div class="fs-5">Analista Programador</div>
              </div>
          <p></p>
          <div>
            Soy Analista Programador de Sistemas, con el manejo de Back-End 75%
            y Front-End 65% en las siguientes tecnologías:
            <p />
            <ul>
              <li>PHP/Laravel - Servicios API Rest</li>
              <li>Vue + Vuex + Vue-Router + Bootstrap-Vue + Axios => SPA</li>
              <li>HTML + CSS + Javascript + Bootstrap</li>
              <li>SqlServer - Mysql - PostGreSql</li>
              <li>GitHub - Clean Code - Solid</li>
            </ul>
            <p>
              Puedes encontrarme en facebook <a href="https://www.facebook.com/paulgarcia27/">paulgarcia27</a>
              y en linkedin como <a href="https://www.linkedin.com/in/paul-garcia-rojas/">paul-garcia-rojas</a>
              o escribirme directamtente a mi <a href=" https://bit.ly/2UFDtM7">whatsApp</a> para cualquier desarrollo o asesoria.
            </p>
          </div>
        </b-card>
      </b-col>

      <b-col md="6">
        <b-card class="text-left">
          <div class="info">
                <a href="https://www.facebook.com/paulgarcia27" class="d-block fs-2 text-dark">
                  Prueba Tecnica - Empresa Ophyra Software
                </a>
                <div class="fs-5">Laravel / Vue</div>
              </div>
          <p></p>
          <p> Test para evaluar el conocimiento. Crear un proyecto y subirlo a un servidor personal,
            en el que se puedan crear, eliminar, actualizar y visualizar listado de Item 
            (De la elección del programador). Dichos Items deben incluir una imagen,
            precio, descripción y Título y deben poder visualizarse en una tabla con paginación
            (5 resultados por página). Este test lo realice usando las siguientes tecnologias:
          </p>
          <ul>
            <li>
              Laravel 9 Api Rest, aplicando la arquitectura ADR (Action - Domain
              - Response), Principios Solid, Clean Code.
            </li>
            <li>Vue2 + Vuex + Vue-Router + Bootstrap-Vue + Axios => SPA</li>
            <li>Html + Css + JavaScript + Bootstrap</li>
          </ul>

          Para descargar e instalar el Api Rest de click en el siguiente link -
          <a href="https://github.com/paulgr30/testophyra-laravel" target="_blank">testophyra-laravel</a>
          <p></p>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
h5 {
  font-family: Verdana, Geneva, Tahoma, sans-serif !important;
  font-size: 0.97rem;
  font-weight: 550 !important;
}
</style>
