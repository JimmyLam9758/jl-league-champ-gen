// Get champ data from Web API
async function getChampionData() {
    // set var for web api
    let championApiUrl = "https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json";

    // Fetch data from web api
    let response = await fetch(championApiUrl);
    // Parse JSON data from response
    let responseData = await response.json();
    // Store data into var
    let result = responseData;

    // Grab list of champions from data
    let championsList = result.data;
    // Generate a random index to select a random champion 
    let randomIndex = Math.floor(Math.random() * Object.keys(championsList).length);
    // Select from champion from list
    let randomChampion = championsList[Object.keys(championsList)[randomIndex]];
    // Return champion
    return randomChampion;
}



// Function to display champion data onto webpage
function putDataOnPage(dataToDisplay) {
    // Set champion name and title
    document.getElementsByClassName("championName")[0].textContent = dataToDisplay.name + ", " + dataToDisplay.title;

    // Get the tag for display elements
    let tag1Display = document.getElementsByClassName("championTag1")[0];
    let tag2Display = document.getElementsByClassName("championTag2")[0];

    // Set first tag
    tag1Display.textContent = "Tag 1: " + dataToDisplay.tags[0];

    // Check if 2nd tag exist and set it does
    if (dataToDisplay.tags[1]) {
        tag2Display.textContent = "Tag 2: " + dataToDisplay.tags[1];
    } else {
        // if no 2nd tag exists, reset content in tag 2 display
        tag2Display.textContent = "Tag 2: ";
    }

    // Get image container and image element
    let imageContainer = document.getElementsByClassName("championImage")[0];
    let imageElement = imageContainer.getElementsByTagName("IMG")[0];

    // Set base image path and id
    let baseImagePath = "./dragontail-14.10.1/img/champion/tiles/";
    let champId = dataToDisplay.id;
    // Set base skin Id
    let baseSkinId = "_0.jpg";

    // Set base skin Image
    let baseSkinImage = baseImagePath + champId + baseSkinId;

    // Generate a random number to determine if skin will be used
    let skinOdds = Math.floor(Math.random() * 4) + 1;
    // Show result in console
    console.log(skinOdds);

    // If the random number is 1, generate a random skin
    if (skinOdds == 1) {
    // Generate a random skin Id
    let randomSkinId = Math.floor(Math.random() * 20) + 1;
    let altSkinId = "_" + randomSkinId + ".jpg";
    let altSkinImage = baseImagePath + champId + altSkinId;

    // Check if the image exists before setting the src attribute
    let img = new Image();
    img.src = altSkinImage;
    img.onload = function() {
        imageElement.src = altSkinImage;
        console.log("Skin found");
    };
    img.onerror = function() {
        // If the image does not exist, generate a new random skin Id and try again
        console.log("Skin image not found, generating a new one...");
        generateRandomSkin();
    };
    } else {
        // If the random number is not 1, use base skin
    imageElement.src = baseSkinImage;
    }

    // Function to generate a random skin
    function generateRandomSkin() {
        // Generate random skin Id
    let randomSkinId = Math.floor(Math.random() * 20) + 1;
    let altSkinId = "_" + randomSkinId + ".jpg";
    let altSkinImage = baseImagePath + champId + altSkinId;

    // Check if the alternate skin image exists before setting the src attribute
    let img = new Image();
    img.src = altSkinImage;
    img.onload = function() {
        console.log("Skin found")
        imageElement.src = altSkinImage;
    };
    img.onerror = function() {
        console.log("Skin image not found, generating a new one...");
        generateRandomSkin();
    };
    }
}

// Button calls function to get and display data when button is clicked
async function getAndDisplayChampionData(){
    // Get champ data from API
    let data = await getChampionData();
    console.log(data);

    // Displays the champion data on webpage
    putDataOnPage(data);
}

// Add event listener to button to call function
document.getElementById("generate-champ").addEventListener("click", getAndDisplayChampionData);
