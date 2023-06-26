import FetchFromApi from "./fetchFrase.js";

class CreateGame {
  /* Guarda toda la información necesaria para que el juego funcione */
  constructor() {
    this.newfetchFromApi = new FetchFromApi();
    this.puntuacionPartida = 4;
    this.gameEnd = false;
    this.winGame = false;
    this.initializeGame();
  }
  /* Incia el juego tambien lo para dependiendo de los hacierto y los fallos */
  async initializeGame() {
    if(this.gameEnd === false){ 
      await this.newfetchFromApi.orderCalls();
      await this.pasteQuote();
      await this.pasteNames();
      await this.updateButtonImage();
      }else if(this.winGame === true){
        let seccionQuote = document.getElementById("quote-section");
        seccionQuote.innerHTML = "";
        let seccionButton = document.getElementById("buttons-section");
        seccionButton.innerHTML = "";
        let hCreation = document.createElement('h2');
        hCreation.className = 'winFrase';
        hCreation.innerText = "Victory";
        seccionQuote.appendChild(hCreation);

      }else{
        let seccionQuote = document.getElementById("quote-section");
        seccionQuote.innerHTML = "";
        let seccionButton = document.getElementById("buttons-section");
        seccionButton.innerHTML = "";
        let hCreation = document.createElement('h2');
        hCreation.className = 'winFrase';
        hCreation.innerText = "Defeated";
        seccionQuote.appendChild(hCreation);
      }
  }
  /* Pega la frase en el HTML */
  pasteQuote() {
    let quoteContainer = document.querySelector("p#quote");
    quoteContainer.innerHTML = this.newfetchFromApi.characterQuote;
  }
  /* Pega las opciones */
  pasteNames() {
    let sectionClear = document.querySelector("#buttons-section");
    sectionClear.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("button")
      button.className = 'each-button'
      button.textContent = this.newfetchFromApi.arrayNombres[i];
      sectionClear.appendChild(button);
      button.addEventListener("click", () => {
        this.handleButtonClick(i);
      });
    }
  }
  /* Comprueba que la opcion que eliges es la correcta si lo es suma si no resta */
  handleButtonClick(index) {
    if (index === this.newfetchFromApi.indexNombreCorrecto) {
      this.puntuacionPartida++;
      this.newfetchFromApi = new FetchFromApi();
      this.initializeGame();
      if(this.puntuacionPartida == 8){
        this.gameEnd = true
        this.winGame = true
      }

    } else {
      this.puntuacionPartida--;
      this.newfetchFromApi = new FetchFromApi();
      this.initializeGame();
      if(this.puntuacionPartida == 0){
        this.gameEnd = true
      }
    }
  }
  /* Cambia el fondo del body y el div resaltado dependiendo del index 0-9 */
  updateButtonImage() {
    let imagenes = [
      "./assets/img/9-Sauron.jpg",   
      "./assets/img/8-Mordor.jpg",
      "./assets/img/7-Orthanc.jpg",
      "./assets/img/6-Moria.jpg",
      "./assets/img/5-Rivendel.jpg",
      "./assets/img/4-Comarca.jpg",
      "./assets/img/3-Los_Puertos_Grises.jpg",
      "./assets/img/2-Numenor.jpg",
      "./assets/img/1-Valinor.jpg",
    ]
    document.body.style.backgroundImage = `url(${imagenes[this.puntuacionPartida]})`;
    let botones = document.querySelectorAll(".scoreTraker");
    for(let i = 0; i < 9; i++){
      botones[i].classList.remove("seleccionado");
    }
    botones[this.puntuacionPartida].classList.add("seleccionado");   
  }  
}

export default CreateGame;