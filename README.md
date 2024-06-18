<img width="200px" src="https://ingenia.com/assets/images/global/Logo-Ingenia-Colour.png" title="Jeet Grid System">

# Plantilla gulp (stylus)
Plantilla gulp V. 4 para proyectos planos con stylus

## Requerimentos previos
### Node*
Se debe tener instalado [Node.js](https://nodejs.org/es/) versión 8.11.1 o mayor.

Si deseas tener varias versiones de node instalado en tu computadora puedes revisar la entrada para [Windows](https://luismasdev.com/instalar-varias-versiones-nodejs-en-windows/) ó [Mac y Linux](https://medium.com/@jamesauble/install-nvm-on-mac-with-brew-adb921fb92cc)

### Gulp*
Instalación global de [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
```bash
npm i --g gulp-cli
```

Si no se puede instalar probar con:
```bash
sudo npm i --g gulp-cli
```

### [.editorconfig*](https://editorconfig.org/)
Asegurate de instalar este plugin adecuado para tu editor

*Si ya se tienen instalados no es necesario este paso

## Instalación
Usar comando para instalar las dependencias adecuadas

```bash
npm i
```

## Comandos
### Compilando archivos para desarrollo*
Con los siguientes comando podremos compilar el sitio y nos creara solo los archivos necesarios para desarrollo (dist/dev)
```bash
npm run desarrollo
```
ó
```bash
gulp
```

### Compilando archivos para producción*
Con los siguientes comando crearemos el proyecto listo para producción (dist/prod) 
```bash
npm run produccion
```
ó
```bash
gulp produccion
```

### Compilación especial (Ingenia)*
Con los siguientes comando crearemos el proyecto listo para desarrollo (dist/dev) y producción (dist/prod) 
```bash
npm run ingenia
```
ó
```bash
gulp ingenia
```

*Todos estos comandos compilan todos los archivos necesarios y levantan un servidor 

desarrollo - Crea un servidor a (dist/dev), solo compila los archivos para dev

produccion - Crea un servidor a (dist/prod), solo compila los archivos para prod

ingenia - Crea un servidor a (dist/dev), compila los archivos para prod y dev


## Directorio
Directorio principal (todo se controla desde la carpeta src, no es necesario manipular achivos fuera de esta carpeta)

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

