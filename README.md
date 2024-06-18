<img width="200px" src="https://nomadadigitalweb.com.ar/wp-content/uploads/2021/05/Logo-Nomada.png" title="Jeet Grid System">

# Proyecto de Página Web con Pug, Stylus y Gulp

Este proyecto consiste en la creación de una página web utilizando preprocesadores para HTML y CSS, específicamente Pug y Stylus, respectivamente. Utilizamos Gulp para automatizar tareas y manejar los procesos de compilación.

## Estructura del Proyecto

Trabajamos las vistas por medio de componentes y mixins, lo que nos permite crear un código modular y reutilizable. Para el CSS, empleamos Stylus junto con la metodología BEM (Block Element Modifier) para mantener un código limpio y mantenible.

El JavaScript se utiliza en su forma básica para agregar funcionalidades como animaciones, sliders, entre otros.

El proyecto se manejará con Yarn como el gestor de dependencias.

## Requisitos

- Node.js (versión 12 o superior)
- Yarn
- Gulp CLI

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto.git
   cd tu-proyecto
   ```

2. Instala las dependencias:

   ```bash
   yarn install
   ```

3. Inicia el proyecto:
   ```bash
   gulp
   ```

## Estructura de Archivos

```bash
src
|----assets
|
|----css
|    |----base
|    |----config
|    |----layout
|    |----libs
|    |----sections
|    |----theme
|    |----style.styl
|
|----fonts
|    |----nombreFuente
|    |    |----nombreFuente.woff
|    |    |----nombreFuente.woff2
|    |
|    |----nombreFuenteDos
|         |----nombreFuenteDos.woff
|         |----nombreFuenteDos.woff2
|
|----html
|    |----components
|    |----config
|    |----mixins
|    |----sections
|    |----template
|    |----index.pug
|
|----images
|    |----carpeta1
|    |----carpta2
|         |----imagen.jpg
|         |----imagen.png
|         |----imagen.svg
|         |----imagen.gif
|
|----js
|    |----controllers
|    |----libs
|    |    |----_alert.js
|    |    |----_customForm.js
|    |    |----_fillViews.js
|    |    |----_select.js
|    |    |----_validate.js
|    |---main.js
|
|----json
|
|----video
|
|----gulpfile.js
|----config.json
|----package.json
|----README.md
```
