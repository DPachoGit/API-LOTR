import FetchFromApi from "./fetchFrase.js";

class CreateGame {
  constructor() {
    this.newfetchFromApi = new FetchFromApi();
    this.initializeGame();
    this.puntuacionPartida = 5;
    this.gameEnd = false;
    this.winGame = false;
  }

  async initializeGame() {
    if(this.gameEnd == false){
      await this.newfetchFromApi.orderCalls();
      this.pasteQuote();
      this.pasteNames();
      this.startCounter();
      }else if(this.winGame === true){
        let seccionQuote = document.getElementById("quote");
        seccionQuote.innerHTML = "";
        let seccionButton = document.getElementById("buttons-section");
        seccionButton.innerHTML = "";
        let hCreation = document.createElement('h2');
        hCreation.className = 'winFrase';
        hCreation.innerText = "Victory";
      }else{
        let seccionQuote = document.getElementById("quote");
        seccionQuote.innerHTML = "";
        let seccionButton = document.getElementById("buttons-section");
        seccionButton.innerHTML = "";
        let hCreation = document.createElement('h2');
        hCreation.className = 'winFrase';
        hCreation.innerText = "Defeated";
      }
  }

  pasteQuote() {
    let quoteContainer = document.querySelector("p#quote");
    quoteContainer.innerHTML = this.newfetchFromApi.characterQuote;
  }

  pasteNames() {
    let sectionClear = document.querySelector("#buttons-section");
    sectionClear.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      let button = document.createElement("button");
      button.textContent = this.newfetchFromApi.arrayNombres[i];
      sectionClear.appendChild(button);
      button.addEventListener("click", () => {
        this.handleButtonClick(i);
      });
    }
  }

  handleButtonClick(index) {
    if (index === this.newfetchFromApi.indexNombreCorrecto) {
      this.puntuacionPartida++;
      this.newfetchFromApi = new FetchFromApi();
      this.initializeGame();
      if(this.puntuacionPartida == 9){
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

  updateButtonImage() {
    let imagenes = [
      "img-1.png",
      "img-2.png",
      "img-3.png",
      "img-4.png",
      "img-5.png",
      "img-6.png",
      "img-7.png",
      "img-8.png",
      "img-9.png",    
    ]
    document.body.style.backgroundImage = url(imagenes[this.puntuacionPartida]);
    let botones = document.querySelectorAll(".boton");
    botones[this.puntuacionPartida].classList.add("seleccionado");
  }
  
}
export default CreateGame;





    