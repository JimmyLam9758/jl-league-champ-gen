async function getChampionData() {
    let championApiUrl = "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json";

    let response = await fetch(championApiUrl);
    let responseData = await response.json();
    let result = responseData;

    let championsList = result.data;
    let randomIndex = Math.floor(Math.random() * Object.keys(championsList).length);
    let randomChampion = championsList[Object.keys(championsList)[randomIndex]];

    return randomChampion;
}


function putDataOnPage(dataToDisplay){
    document.getElementsByClassName("championName")[0].textContent = dataToDisplay.name;

    let tag1Display = document.getElementsByClassName("championTag1")[0];
    let tag2Display = document.getElementsByClassName("championTag2")[0];

    tag1Display.textContent = "Tag 1: " + dataToDisplay.tags[0].tag.name;

    if (dataToDisplay.types[1]){
        // if the data includes a 2nd tag, set that aswell
        tag2Display.textContext = "Tag 2: " + dataToDisplay.tags[1].tag.name;
    } else{
        // if no 2nd tag exists, reset content in type 2 display
        tag2Display.textContent = "Tag 2: ";
    }

    let imageContainer = document.getElementsByClassName("championImage")[0];
    let imageElement = imageContainer.getElementsByTagName("IMG")[0];

    imageElement.src = dataToDisplay.image.full;


}


// Button calls this 
async function getAndDisplayChampionData(){
    let data = await getChampionData();
    console.log(data);

    putDataOnPage(data);
}

document.getElementById("generate-champ").addEventListener("click", getAndDisplayChampionData);
