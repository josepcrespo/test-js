1. Sin necesidad de ejecutar el código, ¿sabrías decirnos qué valor imprimiría
por consola el script? ¿Cuál es el motivo?

El siguiente código imprimiría cinco veces el enter `5`:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000)
}

```

El motivo de esta salida es, que la función nativa setTimeout, evalua una
expresión después del número de milisegundos especificado. Es por eso que, en
el momento de ejecutarse `console.log(i)`, el valor de `i` es ya 5. Porqué la
ejecución del bucle `for` termina antes de que se dispare la función `setTimeout`.


2. Sabiendo que el output que buscamos es:

```javascript
> 0
> 1
> 2
> 3
> 4
```

¿Cómo solucionarías el fragmento de código para que el output sea el deseado?

```javascript
var i = 0;
var myInterval = setInterval(displayCount, 1000);

function displayCount() {
    console.log(window.i);
    window.i = window.i + 1;
}

setTimeout(function () {
    clearInterval(myInterval);
}, 5000);
```