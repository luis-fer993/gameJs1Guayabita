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
/*
  for (let index = 0; index < jugadores.length; index++) {
    jugadores.shift()
    
  }*/
  //---

  class Person {
    constructor(n = "jugador", v = 100, total = 0, g = false) {
      this.nombre = n;
      this.valorInicial = v;
      this.valorInicioTotal=total;
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
          "Ingrese el valor total de su presupuesto\nRecuerde que debe ser mayor a $300"
        )
      );
    } while(isNaN(valTo)||(valTo < 300));

    do {
      var val = parseInt(
        prompt(
          `Ingrese el valor inicial\nRecuerde que no debe ser menor a $100
          \nAdemas no puede ser mayor a su presupuesto total y\ndebe tener una diferencia minimo de $100`
        )
      );
    } while ((isNaN(val) || val < 100)||(val >valTo-100) );
    
    valTo=valTo-val;

    jugadores[i] = new Person(n, val,valTo);
    
  }
  console.log(jugadores)

  var total = 0;
  for (i = 0; i < jugadores.length; i++) {
    total += jugadores[i].valorInicial;
  }

  var sorteo = document.querySelector("button.btn-success");
  sorteo.style.display = "block";

  //var juego = document.getElementByClassName('juego');

  sorteo.addEventListener("click", () => {
    if (total > 0 && jugadores.length >1 ) {
        for (i = 0; i <= jugadores.length -1; i++) {
          console.log('val t'+jugadores[i].nombre+' tiene '+jugadores[i].valorTotal)
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
                      "Usted perdio el primer tiro,ingrese el valor para ingresar\nTotal del deposito: " +
                        total +
                        "\nNumero anterior: " +resultado+"\nMi total de Dinero: "+jugadores[i].valorTotal
                    )
                  );
                } while (isNaN(valor));
  
                console.log('valor antes: '+jugadores[i].valorTotal)
                jugadores[i].valorTotal-=valor;           
                console.log('valor des: '+jugadores[i].valorTotal)
  
                total += valor;
  
                if (jugadores[i].valorTotal<=0) {
                  alert(`Jugador ${jugadores[i].nombre} ha quedado sin fondos\nSera eliminado del juego`);
                  jugadores.splice(i,1);
                  break;
                }
  
              
            } else {
                do {
                  valor = parseInt(
                    prompt(
                      "Usted gano el tiro ingrese un valor para apostar el cual no debe ser mayor al deposito actual: \nTotal deposito:" +
                        total +
                      "\nNumero anterior: 🎲  " +resultado+"\nMi total de Dinero: "+jugadores[i].valorTotal
                    )
                  );
                } while (isNaN(valor)||valor>total);
              
              var apuesta = getRandomInt(1, 7);
                  /*
              Swal.fire({
                title: `Resultados`,
                text: jugadores[i].nombre +"\nSaco el siguiente numero: 🎲  " +apuesta +"\nNumero anterior: " +resultado+
                "\nMi total de Dinero: "+jugadores[i].valorTotal,
                icon: "info",
                timer: 4000,
                timerProgressBar: true,
              });*/
              alert(
                jugadores[i].nombre +
                  "\nSaco el siguiente numero: 🎲  " +
                  apuesta +
                  "\nNumero anterior: " +
                  resultado
              );
  
              if (apuesta > resultado) {
                total -= valor;
                jugadores[i].valorTotal+=valor;   
                alert("Usted gano la apuesta\nTotal deposito: " + total+"\nMi total de Dinero: "+jugadores[i].valorTotal);/*
                setTimeout(() => {
                  Swal.fire({
                    title: `Usted gano la apuesta\nTotal deposito: ` + total,
                    text: "Felicidades\nMi total de Dinero: "+jugadores[i].valorTotal,
                    icon: "success",
                    timer: 4500,
                    timerProgressBar: true,
                  });
                }, 5000);*/
                
  
                if (total <= 0) {
                  //alert('Ganador: ' + jugadores[i]);
                  setTimeout(() => {
                    Swal.fire({
                      title: "Felicitaciones... Ganador: " + jugadores[i].nombre,
                      text: "Gano con un total de: "+jugadores[i].valorTotal,
                      width: 600,
                      icon: "success",
                      padding: "3em",
                      color: "#716add",
                      background: "#fff url(./img/trees.png)",
                      backdrop: `
                        rgba(0,0,123,0.4)
                        url('./img/nyan-cat.gif')
                        left top
                        no-repeat
                      `,
                    });
                  }, 1000);
                  var btnNueva = document.getElementById("botonNueva");
                  btnNueva.style.display = "block";
            
                  btnNueva.addEventListener("click", () => {
                    btnNueva.style.display = "none";
                  });
                  break;
                }
              } else {
                total += valor;
                jugadores[i].valorTotal-=valor;
                /*setTimeout(() => {
                  Swal.fire({
                    title: "Usted perdio la apuesta",
                    text: "Total deposito: "+total+"\nTotal mis fondos: "+jugadores[i].valorTotal,
                    width: 600,
                    icon: "error",
                    timer: 4500,
                    timerProgressBar: true,
                  });
                }, 10000);*/
                alert(
                  "Usted perdio la apuesta\ntotal deposito: " +
                    total+"\nTotal mis fondos: "+jugadores[i].valorTotal
                );
  
                  if (jugadores[i].valorTotal<=0) {
                    alert(`Jugador ${jugadores[i].nombre} ha quedado sin fondos\nSera eliminado del juego`);
                    jugadores.splice(i,1);
                    break;
                  }
                
              }
            }
          }
  
        }
    
    }else if(jugadores.length < 2){
      jugadores[0].valorTotal+=total;
        Swal.fire({
          title: "Felicitaciones... Ganador: " + jugadores[0].nombre,
          text: "Gano con un total de: "+jugadores[0].valorTotal ,
          width: 600,
          icon: "success",
          padding: "3em",
          color: "#716add",
          background: "#fff url(./img/trees.png)",
          backdrop: `
            rgba(0,0,123,0.4)
            url('./img/nyan-cat.gif')
            left top
            no-repeat
          `,
        });
        var btnNueva = document.getElementById("botonNueva");
      btnNueva.style.display = "block";

      btnNueva.addEventListener("click", () => {
        btnNueva.style.display = "none";
      });
    
    }else {

      

      

    }
  });
}
