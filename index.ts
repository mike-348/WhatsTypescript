// Define the URL for the dictionary API
const dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Get references to form elements
const defineForm = document.querySelector("#defineform") as HTMLFormElement;
const wordHeaderElement = document.getElementById('word') as HTMLInputElement;
const partOfSpeechElement = document.getElementById('speech') as HTMLInputElement;
const definitionTextElement = document.getElementById("definitionText") as HTMLParagraphElement;

// Set up form submit event handler
defineForm.onsubmit = async () => {
  // Get the word the user entered
  const formData = new FormData(defineForm);
  const word = formData.get("defineword") as string;

  console.log(word);

  // Clear the definition text
  definitionTextElement.innerHTML = "";
  try {
    // Call the fetchDefinition function to get the definition of the word
    const response = await fetchDefinition(word);
    const definition = response[0];

    // Set the word and part of speech
    wordHeaderElement.innerHTML = definition.word;
    partOfSpeechElement.innerHTML = definition.meanings[0].partOfSpeech;

    // Display each definition and its synonyms and antonyms
    definition.meanings.forEach(meaning => {
      meaning.definitions.forEach(definition => {
        definitionTextElement.innerHTML += `
          <p>${definition.definition}</p>
          <p>Synonyms: ${definition.synonyms.join(', ')}</p>
          <p>Antonyms: ${definition.antonyms.join(', ')}</p>
        `;
      });
    });
  } catch (error) {
    console.log(error);
    definitionTextElement.innerHTML = "Oops, something went wrong. Please try again later.";
  }

  // Prevent the page from reloading when the form is submitted
  return false;
};

// Function to fetch the definition of a word from the API
async function fetchDefinition(word: string) {
  const response = await fetch(dictionaryURL + word);
  const data = await response.json();
  return data;
}
