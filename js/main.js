var botonInicio = document.querySelector(".btn-iniciar");
var datos = document.querySelector(".datos");
var datosJugador = document.getElementById("datosJugador");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/*
function imgdado(ndado) {
  switch (ndado) {
    case 1:
      strImg = "../img/cara1.jpg";
      break;

    case 2:
      strImg = "../img/cara2.jpg";
      break;
    case 3:
      strImg = "../img/cara3.jpg";
      break;

    case 4:
      strImg = "../img/cara4.jpg";
      break;

    case 5:
      strImg = "../img/cara5.jpg";
      break;
    case 6:
      strImg = "../img/cara6.jpg";
      break;
    default:
      strImg = "../img/dado.gif";
      break;
  }
  return strImg;
}*/

 function ocultar() {
  botonInicio.style.display = "none";

  var jugadores = [];

  for (let index = 0; index < jugadores.length; index++) {
    jugadores.shift()
    
  }
  //---

  class Person {
    constructor(n = "jugador", v = 100, total = 0, g = false) {
      this.nombre = n;
      this.valorInicial = v;
      this.valorTotal = total;
      this.ganador = g;
    }
  }

  do {
    var nj = prompt(
      "Ingrese el numero de jugadores\nrecuerde la cantidad de jugadores, no deben ser mayores a 5 ni menores que 2"
    );
  } while (isNaN(nj) || nj > 5 || nj < 2);



  for (i = 0; i < nj; i++) {
    n = prompt("ingrese el nombre del jugador " + parseInt(i + 1));
    do {
      var valTo = parseInt(
        prompt(
          "Ingrese el valor total de su presupuesto "
        )
      );
    } while (isNaN(valTo));

    do {
      val = parseInt(
        prompt(
          "Ingrese el valor inicial\recuerde que no debe ser menor a $100 "
        )
      );
    } while (isNaN(val) || val < 100);
    
    valTo=valTo-val;

    jugadores[i] = new Person(n, val,valTo);
  }

  var total = 0;
  for (i = 0; i < jugadores.length; i++) {
    total += jugadores[i].valorInicial;
  }

  var sorteo = document.querySelector("button.btn-success");
  sorteo.style.display = "block";

  //var juego = document.getElementByClassName('juego');

  sorteo.addEventListener("click", () => {
    for (let index = 0; index < jugadores.length; index++) {
      jugadores.shift()
    }
    if (total <= 0) {
      var btnNueva = document.getElementById("botonNueva");
      btnNueva.style.display = "block";

      btnNueva.addEventListener("click", () => {
        btnNueva.style.display = "none";
      });

      alert("Juego terminado 😀");
    } else {
      for (i = 0; i <= jugadores.length - 1; i++) {
        if (!total == 0) {
          console.log(total);
          var resultado = getRandomInt(1, 7);
          //var imgd=imgdado(resultado);
          alert(
            jugadores[i].nombre + " \nSaco el siguiente numero: 🎲 " + resultado
          );
          if (resultado == 1 || resultado == 6) {
              do {
                var valor = parseInt(
                  prompt(
                    "Usted perdio el primer tiro,ingrese el valor apostado\nTotal del deposito: " +
                      total +
                      "\nNumero anterior: " +
                      resultado
                  )
                );
              } while (isNaN(valor));
              jugadores[i].valorTotal-=valor;           

            total += valor;
          } else {
              do {
                valor = parseInt(
                  prompt(
                    "Usted gano el tiro ingrese un valor para apostar: \nTotal deposito:" +
                      total +
                      "\nNumero anterior: 🎲  " +
                      resultado
                  )
                );
              } while (isNaN(valor));
            
            var apuesta = getRandomInt(1, 7);

            alert(
              jugadores[i].nombre +
                "\nSaco el siguiente numero: 🎲  " +
                apuesta +
                "\nNumero anterior: " +
                resultado
            );

            if (apuesta > resultado) {
              total -= valor;
              //alert("Usted gano la apuesta\nTotal deposito: " + total);
              Swal.fire({
                title: `Usted gano la apuesta\nTotal deposito: ` + total,
                text: "Felicidades",
                icon: "success",
                timer: 4000,
                timerProgressBar: true,
              });

              if (total <= 0) {
                //alert('Ganador: ' + jugadores[i]);
                setTimeout(() => {
                  Swal.fire({
                    title: "Felicitaciones... ",
                    text: "Ganador: " + jugadores[i].nombre,
                    width: 600,
                    icon: "success",
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(../img/trees.png)",
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url('../img/nyan-cat.gif')
                      left top
                      no-repeat
                    `,
                  });
                }, 5000);

                break;
              }
            } else {
              total += valor;
              jugadores[i].valorTotal-=valor;
              alert(
                "Usted perdio la apuesta\ntotal deposito: " +
                  total
              );
              if (jugadores[i].valorTotal<=0) {
                alert(`Jugador ${jugadores[i].nombre} ha quedado sin fondos\nSera eliminado del juego`);
                jugadores.splice(i,1);
              }
            }
          }
        }

      }
    }
  });
}
