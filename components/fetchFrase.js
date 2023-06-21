import apiKey from "./apikey.js";
u
class FetchFromApi {
  constructor() {
    this.charactersNames = [];
    this.characterQuote = "";
    this.correctCharacter = "";
    this.correctCharacterName = "";
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

      this.correctCharacter = randomCharacter;
      this.characterQuote = randomDialog;
      console.log(this.correctCharacter);
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
      console.log(this.charactersNames);
    } catch (err) {
      console.error(err);
    }
  }
}

export default FetchFromApi