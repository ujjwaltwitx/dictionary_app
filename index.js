const meaningsBox = document.getElementById("meaningsBox");
async function fetchMeaning() {
    meaningsBox.innerHTML = ""
    const inputData = document.getElementsByClassName("input-box")[0].value;
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+inputData;
    const data = await fetch(url, {
        method : "GET",
    })
    if(data.status != 200){
        meaningsBox.innerHTML = "";
        console.log("error");
        meaningsBox.innerHTML += `<p>The word you searched for is out of this planet</p>`
        return;
    }
    const jsonData = await data.json();
    const meanings = jsonData[0].meanings;
    
    for(var i = 0; i<meanings.length; i++){
        meaningsBox.innerHTML += `<div class="meaning-card">
        <div id="part-of-speech">
            ${meanings[i].partOfSpeech}
        </div>
        
        <div id="description">
        ${meanings[i].definitions[0].definition}
        </div>
        </div>`
    }
    document.getElementsByClassName("save-word-button")[0].setAttribute('style', "visibility:visible");
}

function saveWord() {
    const inputData = document.getElementsByClassName("input-box")[0].value;
    localStorage.setItem(inputData, inputData);
    getSavedWords();
}

function getSavedWords(){
    const saved_words_box = document.getElementById('saved_words');
    saved_words_box.innerHTML = "";
    for(var i = 0; i<localStorage.length; i++){
        saved_words_box.innerHTML += `<div class="saved_word_chip">${localStorage.key(i)}<div id="cancel-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg></div>
      </div>`
    }
}

const searchIcon = document.getElementsByClassName("search-icon")[0]
const saveWordButton = document.getElementsByClassName("save-word-button")[0];
const inputBox = document.getElementsByClassName("input-box")[0];

inputBox.addEventListener('input', ()=>{
    saveWordButton.setAttribute('style', "visibility:hidden")
})

searchIcon.addEventListener('click', function() {
    fetchMeaning();
})
saveWordButton.addEventListener('click', saveWord);

window.onload = ()=>{
    document.getElementsByClassName("save-word-button")[0].setAttribute('style', "visibility:hidden");
    getSavedWords();
};

