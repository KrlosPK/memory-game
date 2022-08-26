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

// Sonidos
let clickAudio = new Audio("./sounds/click.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let rightAudio = new Audio("./sounds/right.wav");
let winAudio = new Audio("./sounds/win.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");

// DOM
let movimientosEl = document.getElementById("movimientos");
let aciertosEl = document.getElementById("aciertos");
let tiempoEl = document.getElementById("tiempoRestante");
let replayEl = document.getElementById("jugarDeNuevo");
let infoEl = document.querySelector("#comoJugar");

// Generación de números aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers.sort(() => {
    return Math.random() - 0.5;
});
console.log(numbers);

// Eventos
infoEl.addEventListener("click", comoJugar);

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        tiempo--;
        tiempoEl.innerHTML = tiempo + " segundos";
        if (tiempo == 0) {
            clearInterval(tiempoRegresivoId);
            gameOver(numbers);
            loseAudio.play();
        }
    }, 1000);
}
function gameOver(numbers) {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="imgs/${numbers[i]}.png">`;
        tarjetaBloqueada.classList.add("disabled");
    }
    Swal.fire({
        icon: "error",
        title: "Perdiste...",
        text: "Inténtalo de nuevo!",
    });
    replayEl.classList.remove("hidden");
}
function comoJugar() {
    Swal.fire({
        icon: "info",
        title: "¿Cómo jugar?",
        text: "Habrán una serie de parejas de cartas boca abajo. Deberás voltear sucesivamente dos cartas, memorizando la ubicación de las mismas. Cuando se encuentren dos cartas idénticas que formen pareja, se sumará un punto. La partida terminará cuando estén todas las parejas encontradas.",
    });
}

// Función Principal
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
        tarjeta1.innerHTML = `<img src="imgs/${primerResultado}.png">`;
        clickAudio.play();

        // Deshabilitar primer botón
        tarjeta1.classList.add("disabled");
    } else if (tarjetasVolteadas == 2) {
        // Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = `<img src="imgs/${segundoResultado}.png">`;

        // Deshabilitar segundo botón
        tarjeta2.classList.add("disabled");

        // Incrementar movimientos
        movimientos++;
        movimientosEl.innerHTML = movimientos;
        if (primerResultado === segundoResultado) {
            // Encerar contador tarjetas destapadas
            tarjetasVolteadas = 0;
            rightAudio.play();

            // Aumentar los aciertos
            aciertos++;
            aciertosEl.innerHTML = aciertos;
        } else {
            // Mostrar momentáneamente
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.classList.remove("disabled");
                tarjeta2.classList.remove("disabled");
                tarjetasVolteadas = 0;
            }, 800);
        }
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
            winAudio.play();
            replayEl.classList.remove("hidden");
        }
    }
}
