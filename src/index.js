
let currentWorkTimer = 1;
let currentBreakTimer = 1;
let currentlyWorking = true;
let currentAudio = "audio/honk.mp3";
let audioLastPlayed = new Date();
let audioThrottle = 500;


function startVideoStream() {
    if (!navigator.mediaDevices.getUserMedia)
        return;
    navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "user" } })
        .then(function (stream) {
        const video = document.querySelector("#webcam");
        video.srcObject = stream;
        video.onloadedmetadata = e => {
            video.play();
        };
        video.onloadeddata = e => {
            startTesting(video);
        };
    })
        .catch(function (err) {
        alert("An error has occurred loading your webcam feed. Try again, or maybe in a different browser?");
    });
}

function displayCountryInfo() {
    let countryFunFacts = [
            {
                "country": "Japan",
                "popularlocaldishes": "Sushi ",
                "touristattractions": "Mount Fuji ",
                "interestingfacts": "Sakura, or cherry blossom, is a symbol of renewal and hope and heralds the arrival of spring each year.",
                "population": "126.5 million",
                "capital": "Tokyo",
                "imagefilename": "MountFuji.jpeg",
                "undefined": "Konnichiwa! Welcome to Japan! We have a population of 126.5 million people and our capital is located in Tokyo! One of our signature dishes is sushi and our most popular national landmark is Mount Fuji. Did you know that sakura, or cherry blossom, is a symbol of renewal and hope and heralds the arrival of spring each year! We hope you enjoy your stay!"
            },
            {
                "country": "Belarus",
                "popularlocaldishes": "Draniki - potato pancakes",
                "touristattractions": "Nesvizh Castle",
                "interestingfacts": "Belarus is the \"Silicon Valley\" of Eastern Europe, home to 170 companies and 27000 IT specialists.",
                "population": "9.475 million",
                "capital": "Minsk",
                "imagefilename": "Nesvizh-Castle.jpg",
                "undefined": "\nдобры дзень! Welcome to Belarus! We have a population of 9.475 million people and our capital is located in Minsk! One of our signature dishes is Draniki - potato pancakes - and our most popular national landmark is Nesvizh Castle. Did you know that Belarus is the \"Silicon Valley\" of Eastern Europe, home to 170 companies and 27000 IT specialists."
            },
            {
                "country": "The Netherlands",
                "popularlocaldishes": "Stroopwafel - wafer cookie with caramel filling",
                "touristattractions": "Explore the Canals of Amsterdam",
                "interestingfacts": "\nThe Netherlands has over 18 million bikes in the country for a population of 17 million.\n",
                "population": "17.28 million",
                "capital": "Amsterdam",
                "imagefilename": "canals_amsterdam.jpeg",
                "undefined": "Hallo! Welcome to The Netherlands! We have a population of 17.28 million people and our capital city is Amsterdam! One of our signature dishes is Stroopwafel - wafer cookie with caramel filling, and our most popular national landmark are the canals of Amsterdam. Did you know that The Netherlands have over 18 million bikes in the country for a population of 17 million.\n"
            },
            {
                "country": "South Africa",
                "popularlocaldishes": "Bobotie - spiced mince meat",
                "touristattractions": "Table Rock",
                "interestingfacts": "\nVarious breeding colonies of penguins can be found only along the coast of South Africa.\n",
                "population": "57.78 million",
                "capital": "Cape Town",
                "imagefilename": " tablerock.jpg",
                "undefined": "Hello! Welcome to South Africa! We have a population of 57.78 million people and we have 3 capital cities: Cape Town, Pretoria, and Bloemfontein! One of our signature dishes is Bobotie - spiced minced meat, and our most popular national landmark is Table Rock - a flat mountain by Cape Town. Did you know that various breeding colonies of penguins can be found only along the coast of South Africa."
            },
            {
                "country": "Singapore",
                "popularlocaldishes": "Chilli crab",
                "touristattractions": "Stroll Along Marina Bay ",
                "interestingfacts": "\nThe swimming pool at Sands Skypark is the longest elevated swimming pool at 200m above ground level.\n",
                "population": "5.639 million",
                "capital": "Singapore",
                "imagefilename": "marinabay.jpeg",
                "undefined": "Hello! Welcome to Singapore! We have a population of 5.639 million people and our capital city is Singapore! One of our signature dishes is chili crab, and our most famous landmark is the Marina Bay! Did you know that the swimming pool at Sands Skypark is the longest elevated swimming pool at 200m above ground level."
            },
            {
                "country": "The Philippines",
                "popularlocaldishes": "Adobo - meat or sea food marinated and fried",
                "touristattractions": "White Beach Boracay",
                "interestingfacts": "\n\"Jeepneys\" were initially made from the jeeps left over after the Second World War, and have since been developed into colourful forms of public transportation.\n",
                "population": "106.7 million",
                "capital": "Manila",
                "imagefilename": "whitebeach.jpg",
                "undefined": "Kamusta and welcome to The Philippines! We have a population of 106.7 million people and our capital city is Manila! One of our signature dishes is Adobo - meat or sea food marinated and fried, and one our most popular national landmarks is the beautiful White Beach Boracay! Did you know that \"Jeepneys\" were initially made from the jeeps left over after the Second World War, and have since been developed into colourful forms of public transportation."
            },
            {
                "country": "Czech Republic",
                "popularlocaldishes": "svíčková - a creamy meat dish",
                "touristattractions": "Prague Castle ",
                "interestingfacts": "\nFounded in 1348, Charles University in Prague is among the oldest in the world and is the oldest in Europe.\n",
                "population": "10.65 million",
                "capital": "Prague",
                "imagefilename": "prague-castle.jpg",
                "undefined": "Ahoj! Welcome to Czech Republic! We have a population of 10.65 million people and our capital city is Prague! One of our signature dishes is svíčková - a creamy meat dish, and our most popular national landmark is Prague Castle. Did you know that,\nfounded in 1348, Charles University in Prague is among the oldest in the world and is the oldest in Europe!"
            },
            {
                "country": "Thailand",
                "popularlocaldishes": "Pad Thai - a mixture of friend noodles, meat, and vegetables",
                "touristattractions": "Bangkok Reclining Buddha Statue",
                "interestingfacts": "\nMuay Thai originated in Thailand during the medieval period as a form of hand-to-hand combat in times of war.\n",
                "population": "69.43 million",
                "capital": "Bangkok",
                "imagefilename": "reclining_buddha.jpg",
                "undefined": "Sawasdee! Welcome to Thailand! We have a population of 69.43 million people and our capital city is Bangkok! One of our signature dishes is Pad Thai - a mixture of friend noodles, meat, and vegetables. Our most popular national landmark is the Bangkok Reclining Buddha Statue. Did you know that Muay Thai originated in Thailand during the medieval period as a form of hand-to-hand combat in times of war."
            },
            {
                "country": "Hong Kong",
                "popularlocaldishes": "Beef brisket noodles - beef on top of wheat noodles",
                "touristattractions": "Tian Tan Buddha (\"Big Buddha\") Statue",
                "interestingfacts": "\nHong Kong Tramways operates the world's largest fleet of double-deck tramcars, carrying 200 000 passengers everyday.\n",
                "population": "7.451 million",
                "capital": "Hong Kong",
                "imagefilename": "hong-kong.jpg",
                "undefined": "Neih hou! Welcome to Hong Kong! We have a population of 7.541 million people and our capital city is Hong Kong, as we are a city-state! One of our signature dishes is beef brisket noodles - beef on top of wheat noodles. Our most popular national landmark is the Tian Tan Buddha (\"Big Buddha\") Statue. Did you know that Hong Kong Tramways operates the world's largest fleet of double-deck tramcars, carrying 200 000 passengers everyday."
            },
            {
                "country": "Italy",
                "popularlocaldishes": "Spaghetti and meatballs",
                "touristattractions": "Leaning Tower of Pisa",
                "interestingfacts": "\n\nThe very first games at the Colosseum, held in 80AD, lasted for 100 days and there were over 3000 gladiator fights.\n",
                "population": "60.36 million",
                "capital": "Rome",
                "imagefilename": "Leaning-Tower-of-Pisa-Italy.jpg",
                "undefined": "Ciao! Welcome to Italy! We have a population of 60.36 million people and our capital city is Rome! One of our signature dishes is spaghetti and meatballs. Our most popular national landmark is the Colosseum. Did you know that the very first games at the Colosseum, held in 80AD, lasted for 100 days and there were over 3000 gladiator fights."
            },
            {
                "country": "Morocco",
                "popularlocaldishes": "Tagine -  slow-cooked stews",
                "touristattractions": "Hassan II Mosque",
                "interestingfacts": "The Kairaouine Mosque in Fez is the oldest university in the world that is still in operation.",
                "population": "36.03 million",
                "capital": "Rabat",
                "imagefilename": "Hassan.jpg",
                "undefined": "As-salaam 'alykum! Welcome to Morocco! We have a population of 36.03 million people and our capital city is Rabat! One of our signature dishes is tagine - slow-cooked stew. Our most popular national landmark is the Hassan II Mosque. Did you know that the Kairaouine Mosque in Fez is the oldest university in the world that is still in operation."
            },
            {
                "country": "Macau",
                "popularlocaldishes": "Minchi - ground beef seasoned with soy sauce",
                "touristattractions": "The Venetian Macao",
                "interestingfacts": "\nMacau is the only place in all of China where gambling is allowed, generating $40 billion of profit a year.\n",
                "population": 631636,
                "capital": "Macau",
                "imagefilename": "venetian.jpg",
                "undefined": "Neih hou! Welcome to Macau! We have a population of 631 636 people and our capital city is Macau, as we are a city state! One of our signature dishes is minchi - ground beef seasoned with soy sauce. Our most popular national landmark is The Venetian Macao - a very famous casino. Did you know that Macau is the only place in all of China where gambling is allowed, generating $40 billion of profit a year."
            },
            {
                "country": "Peru",
                "popularlocaldishes": "Ceviche - marinated fish dish",
                "touristattractions": "Machu Picchu",
                "interestingfacts": "\nThere are 10 million alpacas in the world, and three quarters of them live in peru.\n",
                "population": "31.99 million",
                "capital": "Lima",
                "imagefilename": "Machu_picchu.jpg",
                "undefined": "Hola! Welcome to Peru! We have a population of 31.99 million people and our capital city is Lima! One of our signature dishes is ceviche - a marinated fish dish. Our most popular national landmark is Machu Picchu. Did you know that there are 10 million alpacas in the world, and three quarters of them live in peru."
            },
            {
                "country": "Portugal",
                "popularlocaldishes": "Bacalhau - dried and salted cod",
                "touristattractions": "Mosteiro dos Jeronimos",
                "interestingfacts": "\nTiles (called azulejos) decorate everything, from walls of churches, to palaces, fountains, to much more.\n",
                "population": "10.28 million",
                "capital": "Lisbon",
                "imagefilename": "mdj.jpg",
                "undefined": "Olá! Welcome to Portugal! We have a population of 10.28 million people and our capital city is Lisbon! One of our signature dishes is bacalhau - dried and salted cod. Our most popular national landmark is Mosteiro dos Jeronimos, a large cathedral. Did you know tiles (called azulejos) decorate everything, from walls of churches, to palaces, fountains, and much more."
            },
            {
                "country": "Turkey",
                "popularlocaldishes": "Baklava - layered pastry filled with nuts",
                "touristattractions": "Hagia Sophia",
                "interestingfacts": "\nTurkish Delights are one of the oldest sweets in world history, dating back 500 years! Napoleon and Winston Churchill were fond of the ones with pistachio filling.\n",
                "population": "82 million",
                "capital": "Istanbul",
                "imagefilename": "HagSo.jpeg",
                "undefined": "Merhaba! Welcome to Turkey! We have a population of 82 million people and our capital city is Istanbul! One of our signature dishes is baklava - layered pastry filled with nuts. Our most popular national landmark is the Hagia Sophia. Did you know that Turkish Delights are one of the oldest sweets in world history, dating back 500 years! Napoleon and Winston Churchill were fond of the ones with pistachio filling."
            },
            {
                "country": "Brazil",
                "popularlocaldishes": "Feijoada - Black Bean Stew",
                "touristattractions": "Christ the Redeemer",
                "interestingfacts": "\nThe Rio Carnival is often called \"the world's biggest party\" and holds the record for the world's largest carnival\n",
                "population": "209.5 million",
                "capital": "Brasilia",
                "imagefilename": "christ_t_red.jpg",
                "undefined": "Olá! Welcome to Brazil! We have a population of 209.5 million people and our capital city is Brasilia! One of our signature dishes is feijoada, or black bean stew. Our most popular national landmark is the Christ the Redeemer statue. Did you know that The Rio Carnival is often called \"\"the world's biggest party\"\" and holds the record for the world's largest carnival."
            },
            {
                "country": "India",
                "popularlocaldishes": "Khichdi - made of rice and lentils",
                "touristattractions": "The Taj Mahal",
                "interestingfacts": "\nThe Bengal tiger is India's national animal. They were once very common across the country, but now there are less than 4000 remaining.\n",
                "population": "1.353 billion",
                "capital": "New Delhi",
                "imagefilename": "taj.jpg",
                "undefined": "Namaste! Welcome to India! We have a population of 1.353 billion people and our capital city is New Delhi! One of our signature dishes is khichdi made of rice and lentils. Our most popular national landmark is The Taj Mahal. Did you know that the Bengal tiger is India's national animal. They were once very common across the country, but now there are less than 4000 remaining."
            },
            {
                "country": "New Zealand",
                "popularlocaldishes": "Kiwi Pie - a small meat pie",
                "touristattractions": "Hobbiton Movie Set",
                "interestingfacts": "\nThe word kiwi refers to both the native flightless bird and is a term for a New Zealander.\n",
                "population": "4.886 million ",
                "capital": "Wellington",
                "imagefilename": "hobbitton.jpg",
                "undefined": "Hello and welcome to New Zealand! We have a population of 4.886 million people and our capital city is Wellingtoni! One of our signature dishes is Kiwi Pie - a small meat pie. You should check out the Hobbiton Movie Set. Did you know that the word kiwi refers to both the native flightless bird and is a term for a New Zealander."
            },
            {
                "country": "Canada",
                "popularlocaldishes": "Poutine - fries with cheesecurds and gravy",
                "touristattractions": "The CN Tower",
                "interestingfacts": "\nCanada produces 71% of the world's pure maple syrup, 91% of which is produced in Quebec.\n",
                "population": "37.59 million",
                "capital": "Ottawa",
                "imagefilename": "CNtower.jpeg",
                "undefined": "Hello! Welcome to Canada! We have a population of 37.59 million people and our capital city is Ottawa! One of our signature dishes is poutine - fries with cheesecurds and gravy. Our most popular national landmark is the CN Tower. Did you\nCanada produces 71% of the world's pure maple syrup, 91% of which is produced in Quebec."
            },
            {
                "country": "Mexico",
                "popularlocaldishes": "Mole Rojo - marinade and sauce ",
                "touristattractions": "Chichen Itza",
                "interestingfacts": "\nTequila made from the blue agave plant is native to a town \"Tequila\" located in the state of Jalisco, Mexico.\n",
                "population": "126.2 million",
                "capital": "Mexico City",
                "imagefilename": "chichen-itza.jpg",
                "undefined": "Hola! Welcome to Mexico! We have a population of 126.2 million people and our capital city is Mexico City! One of our signature dishes is Mole Rojo - marinade and sauce. Our most popular national landmark is Chichen Itza. Did you know that Tequila made from the blue agave plant is native to a town \"Tequila\" located in the state of Jalisco, Mexico."
            },
            {
                "country": "China",
                "popularlocaldishes": "Peking duck - Roasted Duck",
                "touristattractions": "The Great Wall of China",
                "interestingfacts": "\nThe Chinese were the first people to invent chopsticks over 5000 years ago.\n",
                "population": "1.393 billion",
                "capital": "Beijing",
                "imagefilename": "gwoc.jpeg",
                "undefined": "Neih hou! Welcome to China! We have a population of 1.393 billion people and our capital city is Beijing! One of our signature dishes is peking duck - a type of roasted duck. Our most popular national landmark is The Great Wall of China. Did you know that \nThe Chinese were the first people to invent chopsticks over 5000 years ago."
            }
        ]
    //generate random number between 0 and number of objects in country fun facts array
    var i = Math.floor((Math.random() * countryFunFacts.length) + 1);

    //create variables for each property at the 'i'th object
    var country = countryFunFacts[i].country;
    var popularLocalDishes = countryFunFacts[i].popularlocaldishes;
    var touristAttractions = countryFunFacts[i].touristattractions;
    var interestingFacts = countryFunFacts[i].interestingfacts;
    var population = countryFunFacts[i].population;
    var capital = countryFunFacts[i].capital;
    var imageFileName = countryFunFacts[i].imagefilename;
    var welcomeMessage = countryFunFacts[i].undefined;

    //display post card message 
    // document.getElementById("country-image").innerHTML = imageFileName;
    printImageToPostcard(imageFileName);
    document.getElementById("country-data").innerHTML = welcomeMessage;
    document.getElementById("country-name").innerHTML = country;
}

function printImageToPostcard(imageName) {
    const image = document.createElement('img');
    image.src  = imageName;
    document.querySelector('.modal-image').appendChild(image)
    // x.setAttribute("src", imageName);
    // x.setAttribute("width", "304");
    // x.setAttribute("height", "228");
    // document.body.appendChild(x);
      
}


function playAudio() {
    const now = new Date();
    const differenceInMS = Math.floor(now.getTime() - audioLastPlayed.getTime());
    if (differenceInMS < audioThrottle)
        return;
    audioLastPlayed = now;
    const audio = new Audio(currentAudio);
    audio.play();
}

let testingTimeout;
let timerTimeout;
let dateOfLastTouch = new Date();

// TODO: I think there should be a toggle for showing system alerts?
let alertIsVisible = false;

function startTesting(video, interval = 100) {

    const title = document.getElementById("header");
    const time = document.getElementById("time");

    const loop = async () => {
        const isTouching = await checkFaceTouching(video);
        const now = new Date();
        if (isTouching) {
                playAudio();
            document.body.classList.add("touching");
            title.innerText = "⚠️ Go back to walking, you're not there yet ⚠️";
            dateOfLastTouch = now;

            // alert() calls are "blocking" within the current thread
            // This is a very sloppy semaphore lock to try to stop us from piling up alerts.
            const showAlerts = document.getElementById("show-alert").checked;
            if (showAlerts && !alertIsVisible) {
                alertIsVisible = true;
                alert("Go take your break!");
                alertIsVisible = false;
            }
        }

        else {
            document.body.classList.remove("touching");
        }
        
        testingTimeout = setTimeout(loop, interval);

    };
    loop();
}
function stopTesting() {
    clearTimeout(testingTimeout);
    clearTimeout(timerTimeout);
}

function AddMinutesToDate(date, minutes) {
    return new Date(date + (minutes * 60000));
}

function SetCountdown(timeInput){
    var now = new Date().getTime();
    var next = AddMinutesToDate(now, timeInput)

    // Update the count down every 1 second
    var x = setInterval(function() {
    
    // Find the distance between now and the count down date
    var distance = next - (new Date().getTime());
        
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById("countdown-display").hidden = false;
    document.getElementById("countdown-display").innerHTML = minutes + "m " + seconds + "s until your next trip!";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);

        document.getElementById("countdown-display").hidden = true;

        if (currentlyWorking == true){
            document.getElementById("break-section").hidden = false;
        } else {
            document.getElementById("work-section").hidden = false;
            ShowPostcard();

        }
    }}, 1000);
}

async function checkFaceTouching(video) {

}

function ShowPostcard(){
    var postcardModal = document.getElementById("postcard-modal");
    var span = document.getElementsByClassName("close")[0];
    postcardModal.style.display = "block";
    displayCountryInfo();
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        postcardModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == postcardModal) {
        postcardModal.style.display = "none";
    }
    } 
}


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("start").addEventListener("click", () => {
        document.getElementById("start").hidden = true;
        startVideoStream();
    });
    if (window.safari) {
        const safari = document.getElementById("safari-warning");
        const safariClose = document.getElementById("close-safari");
        safari.hidden = false;
        safariClose.addEventListener("click", () => {
            safari.hidden = true;
        });
    };

    document.querySelectorAll("button.work-minutes").forEach(el => {
        el.addEventListener("click", e => {
            document.getElementById("work-section").hidden = true;
            document.getElementById("break-section").hidden = true;
            const value = e.target.value;
            console.log(value);
            currentWorkTimer = value;
            currentlyWorking = true;
            SetCountdown(currentWorkTimer);
        });

    });

    document.querySelectorAll("button.break-minutes").forEach(el => {
        el.addEventListener("click", e => {
            document.getElementById("break-section").hidden = true;
            document.getElementById("work-section").hidden = true;
            const value = e.target.value;
            console.log(value);
            currentBreakTimer = value;
            currentlyWorking = false;
            SetCountdown(currentBreakTimer);
            
        });

    });

    document.querySelectorAll("input.sfx").forEach(el => {
        el.addEventListener("change", e => {
            const value = e.target.value;
            console.log("Setting value", value);
            currentAudio = value;
            playAudio();
        });
    });

    var optionsModal = document.getElementById("options-modal");
    var btn = document.getElementById("options");
    var span = document.getElementsByClassName("close")[0];
    
    btn.onclick = function() {
      optionsModal.style.display = "block";
      console.log("it's clicking")
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      optionsModal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == optionsModal) {
        optionsModal.style.display = "none";
      }
    } 




    
});




