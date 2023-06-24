import apiKey from "./apikey.js";

class FetchFromApi {
  /* Guarda toda la información del fetch */
  constructor() {
    this.charactersNames = [];
    this.characterQuote = "";
    this.correctCharacter = "";
    this.correctCharacterName = "";
    this.indexNombreCorrecto = 0;
    this.arrayNombres = []
  }
  /* Hace fetch del las frases de las pelis */
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
  /* Coje una frase aleatoria con el id del personaje */
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
  /* Saco el nombre con la id aleatoria que he cojido */
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
  /* Hace fetch de todos los nombres de los personajes de lotr */
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
  /* Inserto en el array arrayNombres 3 nombres aleatorios y el correcto */
  async sortedInfo() {
    this.arrayNombres = [];    
    const shuffledNames = this.charactersNames
      .filter(name => name !== this.correctCharacterName) 
      .sort(() => 0.5 - Math.random());   
    const randomNames = shuffledNames.slice(0, 3);  
    const randomIndex = Math.floor(Math.random() * (randomNames.length + 1));
    randomNames.splice(randomIndex, 0, this.correctCharacterName);  
    this.arrayNombres = randomNames;
    this.indexNombreCorrecto = randomIndex;
  }
   /* Ejecuta todoslos metodos en la clase para crear la informacion necesaria en el constructor */
   async orderCalls() {
    await this.getRandomQuote();
    await this.fromIdToName(this.correctCharacter);
    await this.getAllNames();
    await this.sortedInfo()
  }
}
export default FetchFromApi