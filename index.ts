// Import stylesheets
// import "./style.css";

const dictionaryURL: string =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";
const form: HTMLFormElement = document.querySelector(
  "#defineform"
) as HTMLFormElement;
const wordheader = document.getElementById('word') as HTMLInputElement;
const speech = document.getElementById('speech') as HTMLInputElement;
const definitionText = document.getElementById("definitionText") as HTMLParagraphElement;

form.onsubmit = () => {
  const formData = new FormData(form);
  const word = formData.get("defineword") as string;
  console.log(word);

  definitionText!.innerHTML = "";
  fetchDefinition(word).then((response) => {
    wordheader!.innerHTML = response[0].word;
    speech!.innerHTML = response[0].meanings[0].partOfSpeech;
    var index = 0;
    
    response[0].meanings.forEach((def) => {
      console.log(def.definitions[index]);
      definitionText!.innerHTML += `<p>${def.definitions[index].definition}</p>`;
      for (var i = 0; i < def.definitions[index].synonyms.length; i++) {
        definitionText!.innerHTML += `<p>${def.definitions[index].synonyms[i]}</p>`;
      }
      for (var i = 0; i < def.definitions[index].antonyms.length; i++) {
        definitionText!.innerHTML += `<p>${def.definitions[index].antonyms[i]}</p>`;
      }
    });
  });

  return false; // prevent reload
};

async function fetchDefinition(word: string) {
  try {
    const response = await fetch(dictionaryURL + word, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
