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



function putDataOnPage(dataToDisplay) {
    document.getElementsByClassName("championName")[0].textContent = dataToDisplay.name + ", " + dataToDisplay.title;

    let tag1Display = document.getElementsByClassName("championTag1")[0];
    let tag2Display = document.getElementsByClassName("championTag2")[0];

    tag1Display.textContent = "Tag 1: " + dataToDisplay.tags[0];

    if (dataToDisplay.tags[1]) {
        // if the data includes a 2nd tag, set that aswell
        tag2Display.textContent = "Tag 2: " + dataToDisplay.tags[1];
    } else {
        // if no 2nd tag exists, reset content in tag 2 display
        tag2Display.textContent = "Tag 2: ";
    }

    // Get image container
    let imageContainer = document.getElementsByClassName("championImage")[0];
    // Get image element inside container
    let imageElement = imageContainer.getElementsByTagName("IMG")[0];

    // Get image source
    // imageElement.src = "../dragontail-14.10.1/img/champion/tiles/" + dataToDisplay.id + "_0.jpg"

    let baseImagePath = "../dragontail-14.10.1/img/champion/tiles/"
    let champId = dataToDisplay.id
    let baseSkinId = "_0.jpg"

    let baseSkinImage = baseImagePath + champId + baseSkinId

    // imageElement.src = baseSkinImage

    let altSkinId = "_" + Math.floor(Math.random() * 20) + 1 + ".jpg";
    let altSkinImage = baseImagePath + champId + altSkinId;
    imageElement.src = altSkinImage;
    
}

// Button calls this 
async function getAndDisplayChampionData(){
    let data = await getChampionData();
    console.log(data);

    putDataOnPage(data);
}

document.getElementById("generate-champ").addEventListener("click", getAndDisplayChampionData);
