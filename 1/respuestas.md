1. En el fragmento de código de nuestro archivo (`test.js`) podemos encontrar
hasta 3 variables. ¿Podrías decirnos cuál sería el valor de todas ellas al 
finalizar la ejecución del script?

```javascript
// rgb
{
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    white: "#FFFFFF",
    black: "#000000"
}

// wb
{
    white: "#FFFFFF",
    black: "#000000"
}

// colors
{
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    white: "#FFFFFF",
    black: "#000000"
}
```


2. Modifica el código para que las variables `rgb` y `wb` mantengan sus valores 
iniciales y `colors` tenga los valores de ambas al finalizar la ejecución del 
script.

```javascript
var rgb = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
};

var wb = {
    white: "#FFFFFF",
    black: "#000000"
};

var colors = {...rgb, ...wb);
```


3. Además, tenemos un bug localizado en dispositivos con Internet Explorer… 
El código de nuestro script no funciona y necesitamos que se ejecute también 
en este navegador. ¿Sabrías identificar cuál es el problema? ¿Qué solución nos
propones?

`Object.assign` no está disponible en Internet Explorer. Usaría un transpilador
de código JavaScript, como Babel, para transformar código moderno en código
compatible con versiones antiguas.

Referencia:
https://caniuse.com/mdn-javascript_builtins_object_assign
https://babeljs.io/

