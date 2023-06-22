import FetchFromApi from "./fetchFrase.js";

class CreateGame {
  constructor() {
    this.newfetchFromApi = new FetchFromApi();
    this.initializeGame();
    this.puntuacionPartida = 0 
  }

  async initializeGame() {
    await this.newfetchFromApi.orderCalls();
    this.pasteQuote();
    this.pasteNames();
  
  }

  pasteQuote() {
    let quoteContainer = document.querySelector("p#quote")
    quoteContainer.innerHTML = this.newfetchFromApi.characterQuote;
  }

  pasteNames() {
    let sectionClear = document.querySelector("#buttons-section")
    sectionClear.innerHTML = ""
   for(let i = 0; i < 4; i++){
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
      this.puntuacionPartida++
      this.newfetchFromApi = new FetchFromApi;
      this.initializeGame();
      let scoreContainer = document.querySelector("p#score")
      scoreContainer.innerHTML = this.puntuacionPartida;
      console.log("Correct answer!");
    } else {
      this.puntuacionPartida--
      this.newfetchFromApi = new FetchFromApi;
      this.initializeGame();
      let scoreContainer = document.querySelector("p#score")
      scoreContainer.innerHTML = this.puntuacionPartida;
      console.log("Wrong answer!");
    }
  }
}

export default CreateGame
