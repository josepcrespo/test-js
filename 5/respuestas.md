# Solución propuesta

## Ejercicio 1:

Para este primer ejercicio la solución se encuentra disponible dentro del fichero `index.js` y `videomanager.js` (vamos a omitir el resto de ficheros momento)

### createVideoElement

Esta es una de las funciones más básicas presentes en el fichero `videomanager.js` su función consiste en a partir de un cierto source crear un nuevo tag de video

### onInsertVideoWhenTargetIsVisible

Esta función va a ser la encargada de enlazar el Video Element creado con la anterior función junto con su contenedor.

Esperará hasta que el contenedor sea visible para inyectar el video.

Además se ha añadido un parámetro extra de configuración que nos permite configurar si queremos que el video pare o no.

Por otra parte hacemos comprobaciones básicas de funcionamiento como:

* Asegurarnos que sólo se inyecta el elemento en una única ocasión
* Que una vez se ha terminado el video se limpian todos los handlers asociados a los eventos de la window
* Que una vez se ha terminado el video se elimina el tag de video del DOM
* Que se consiga hacer `autoplay` del video siendo coherentes siempre con las políticas del browser

### onVisible

Esta función tiene por principal objetivo subscribirse a los eventos de la window que nos pueden ayudar a detectar si estamos o no dentro del viewport y reportar mediante un callback si es o no es visible el elemento en un cierto instante de tiempo

Además retornará una función de limpieza para permitir que los eventos a los que se le han añadido `handlers` se liberen

### isElementInViewport

Una de las funciones más sencillas de entender y que hace una comprobación sobre si el Rect del elemento está ahora mismo (al menos de forma parcial) dentro del viewport.

### autoplayVideoElement

Debido a ciertas restricciones de los navegadores sobre el `autoplay` de videos con sonido se optó a implementar esta función la cual intentará reproducir el contenido, en caso de no lograrlo, se realizará un `mute` y lo volverá a intentar.

Como se puede ver en Chrome por ejemplo el video va a empezar siempre en `mute` a no ser que el usuario interactúe con la web, por otra parte en navegadores antiguos como IE11 el video comenzará con sonido sin ningún tipo de problemas.

## Ejercicio 2:

Este ejercicio puede parecer a priori el más complejo debido al largo número de ficheros de configuración que se han añadido, cierto es que muchas configuraciones podrían simplemente inyectarse dentro del propio fichero de configuración de webpack pero me pareció a mi entender más lógico usar el estilo más estándar utilizado en estas librerías.

Para la compilación a ES5 podemos ver que hay varios ficheros asociados, entre ellos:

* `babel.es5.config.js`: Este fichero de configuración contiene el `preset-env` de babel acompañado de los polyfills necesarios (via `core-js`) para el correcto funcionamiento en IE11
* `webpack.es5.js`: El propio fichero de configuración de webpack dado al que se le ha indicado al `babel-loader` donde se encuentra el fichero de configuración de babel a utilizar

De igual manera tenemos la misma configuración para ES6, sin embargo me he tomado la pequeña libertad de hacer una pequeña prueba de concepto utilizando TypeScript, y el resultado de esta prueba se puede apreciar en los ficheros:

* `tsconfig.json`: Fichero principal de configuración de TS (notar el target de la configuración a ES6)
* `webpack.ts.js`: Este es el fichero de configuración de webpack asociado que hace uso del `ts-loader` para generar el bundle

Este código se puede probar haciendo uso del script `build:ts` presente en el `package.json` para que se compilen todos los ficheros `.ts` presentes en la carpeta de fuentes

**Disclaimer:** Actualmente únicamente soporta ES6, tras hacer pruebas sobre IE11 con target ES5 el resultado no fue el esperado de que llegase a funcionar

### Otros ficheros de configuración

Además de los ya comentados se pueden apreciar otros ficheros de configuración, a saber:

* `jest.config.js`: Fichero de configuración para el entorno de tests, se ha decidido utilizar jest por facilidad de uso y por cercanía en mi caso como desarrollador a la herramienta, aunque cualquier otro framework de tests unitarios podría ser válido (los tests se pueden ejecutar mediante el script `test` presente en el `package.json`)
* `.eslintrc.js`: Fichero de configuración del linter para los ficheros JS, utiliza ESLint como herramienta de linting. Se puede ejecutar mediante el script `lint`

## Ejercicio 3:

Para ser capaces de conseguir cargar un fichero u otro en función de nuestras necesidades (ES5 ó ES6) se ha optado por añadir un pequeño script de `feature detection` dentro de la carpeta de `scripts`.

Este pequeño `script` lo que hará será ir haciendo un check de las features que se utilizan dentro de nuestro código fuente, si soporta todas y cada una de ellas significa que podremos hacer uso el fichero de ES6, en caso contrario y como se puede ver en el comportamiento de IE11, se optará por cargar el fichero asociado a ES5