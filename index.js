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
}

const searchIcon = document.getElementsByClassName("search-icon")[0]


searchIcon.addEventListener('click', function() {
    fetchMeaning();
})


