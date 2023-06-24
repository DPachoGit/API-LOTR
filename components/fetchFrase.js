import apiKey from "./apikey.js";

class FetchFromApi {
  constructor() {
    this.charactersNames = [];
    this.characterQuote = "";
    this.correctCharacter = "";
    this.correctCharacterName = "";
    this.indexNombreCorrecto = 0;
    this.arrayNombres = []
  }

  async getQuotes() {
    try {
      let response = await fetch("https://the-one-api.dev/v2/quote", {
        headers: {
          Authorization: apiKey,
        },
      });
      let data = await response.json();
      return data.docs;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getRandomQuote() {
    let quotes = await this.getQuotes();
    if (quotes.length > 0) {
      let randomIndex = Math.floor(Math.random() * quotes.length);
      let randomCharacter = quotes[randomIndex].character;
      let randomDialog = quotes[randomIndex].dialog;

      while (randomDialog.length < 15) {
        randomIndex = Math.floor(Math.random() * quotes.length);
        randomCharacter = quotes[randomIndex].character;
        randomDialog = quotes[randomIndex].dialog;
      }

      this.correctCharacter = randomCharacter;
      this.characterQuote = randomDialog;
      console.log(this.characterQuote);
    } else {
      console.log("No data found");
    }
  }

  async fromIdToName(correctCharacter) {
    try {
      let response = await fetch(
        `https://the-one-api.dev/v2/character/${correctCharacter}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      let data = await response.json();
      this.correctCharacterName = data.docs[0].name;
      console.log(this.correctCharacterName);
    } catch (err) {
      console.error(err);
    }
  }

  async orderCalls() {
    await this.getRandomQuote();
    await this.fromIdToName(this.correctCharacter);
    await this.getAllNames();
    await this.sortedInfo()
  }

  async getAllNames() {
    try {
      let response = await fetch("https://the-one-api.dev/v2/character", {
        headers: {
          Authorization: apiKey,
        },
      });
      let data = await response.json();
      this.charactersNames = data.docs.map((character) => character.name);
    } catch (err) {
      console.error(err);
    }
  }

  async sortedInfo() {
    this.arrayNombres = [];
  
    // Obtener cuatro nombres aleatorios, tres de this.charactersNames y uno de this.correctCharacterName
    const shuffledNames = this.charactersNames
      .filter(name => name !== this.correctCharacterName) // Excluir el nombre correcto
      .sort(() => 0.5 - Math.random()); // Ordenar de forma aleatoria
  
    const randomNames = shuffledNames.slice(0, 3); // Tomar los primeros tres nombres aleatorios
  
    const randomIndex = Math.floor(Math.random() * (randomNames.length + 1)); // Generar un índice aleatorio para insertar el nombre correcto
    randomNames.splice(randomIndex, 0, this.correctCharacterName); // Insertar el nombre correcto en la posición aleatoria
  
    this.arrayNombres = randomNames;
    this.indexNombreCorrecto = randomIndex;
  }

}
export default FetchFromApi

