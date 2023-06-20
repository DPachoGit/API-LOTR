import apiKey from "./apikey.js";

async function getData() {
  try {
    let response = await fetch("https://the-one-api.dev/v2/quote",{
        headers: {
          Authorization: apiKey,
        },
      }
    );
    let data = await response.json();
    // Check if 'docs' array exists within the data object
    if (data.docs.length > 0) {
      let quotes = data.docs;

      // Generate a random index within the quotes array length
      let randomIndex = Math.floor(Math.random() * quotes.length);

      // Get the random character and dialog
      let randomCharacter = quotes[randomIndex].character;
      let randomDialog = quotes[randomIndex].dialog;

      console.log("Random Character:", randomCharacter);
      console.log("Random Dialog:", randomDialog);
    } else {
      console.log("No data found");
    }
  } catch {
    console.error(error);
  }
}
getData();
