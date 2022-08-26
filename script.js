// Hacer que el usuario pierda con muchos movimientos
// Inicialización de variables
let tarjetasVolteadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;

// Generación de números aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers.sort(() => {
    return Math.random() - 0.5;
});
console.log(numbers);

function voltear(id) {
    tarjetasVolteadas++;
    console.log(tarjetasVolteadas);
    if (tarjetasVolteadas == 1) {
        // Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id];
        tarjeta1.innerHTML = primerResultado;

        // Deshabilitar primer botón
        tarjeta1.classList.add("disabled");
    }
}
