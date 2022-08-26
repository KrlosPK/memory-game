// Hacer que el usuario pierda con muchos movimientos
// Inicialización de variables
let tarjetasVolteadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempoInicial = 30;
let tiempo = 30;
let tiempoRegresivoId = null;

// DOM
let movimientosEl = document.getElementById("movimientos");
let aciertosEl = document.getElementById("aciertos");
let tiempoEl = document.getElementById("tiempoRestante");
let replayEl = document.getElementById("jugarDeNuevo");

// Generación de números aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers.sort(() => {
    return Math.random() - 0.5;
});
console.log(numbers);

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        tiempo--;
        tiempoEl.innerHTML = tiempo + " segundos";
        if (tiempo == 0) {
            clearInterval(tiempoRegresivoId);
            gameOver();
        }
    }, 1000);
}
function gameOver() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.classList.add("disabled");
    }
    Swal.fire({
        icon: "error",
        title: "Perdiste...",
        text: "Inténtalo de nuevo!",
    });
    replayEl.classList.remove("hidden");
}

function voltear(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasVolteadas++;
    console.log(tarjetasVolteadas);
    if (tarjetasVolteadas == 1) {
        // Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id];
        tarjeta1.innerHTML = primerResultado;

        // Deshabilitar primer botón
        tarjeta1.classList.add("disabled");
    } else if (tarjetasVolteadas == 2) {
        // Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = segundoResultado;

        // Deshabilitar segundo botón
        tarjeta2.classList.add("disabled");

        // Incrementar movimientos
        movimientos++;
        movimientosEl.innerHTML = movimientos;
        if (primerResultado === segundoResultado) {
            // Encerar contador tarjetas destapadas
            tarjetasVolteadas = 0;

            // Aumentar los aciertos
            aciertos++;
            aciertosEl.innerHTML = aciertos;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                aciertosEl.innerHTML = `${aciertos} 😱`;
                tiempoEl.innerHTML = `Fantástico, solo te demoraste ${
                    tiempoInicial - tiempo
                } segundos 🎉`;
                movimientosEl.innerHTML = `${movimientos} 😎`;
                Swal.fire({
                    icon: "success",
                    title: "¡Enhorabuena!",
                    text: "Haz ganado 🥳",
                });
                replayEl.classList.remove("hidden");
            }
        } else {
            // Mostrar momentáneamente
            setTimeout(() => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.classList.remove("disabled");
                tarjeta2.classList.remove("disabled");
                tarjetasVolteadas = 0;
            }, 800);
        }
    }
}
