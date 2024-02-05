// Définition de la clé API et de l'URL de l'API OpenWeatherMap
const apiKey = "43ff749b56ef03fec6228d2b8f104780";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Sélection des éléments HTML
const searchBox = document.querySelector(".search input"); // Champ de recherche
const searchBtn = document.querySelector(".search button"); // Bouton de recherche
const weatherIcon = document.querySelector(".weather-icon"); // Icône météo

// Fonction asynchrone pour vérifier la météo en fonction de la ville
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) { // Si le lieu est introuvable
        // Affichage du message d'erreur
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").style.color = "black";
        document.querySelector(".weather").style.display = "none";
        searchBox.style.color = "red"; // Changement de couleur du champ de recherche
    } else {
        // Récupération des données météo
        var data = await response.json();

        // Mise à jour des éléments HTML avec les données météo
        document.querySelector(".city").innerHTML = data.name; // Nom de la ville
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"; // Température
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidité
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Vitesse du vent

        // Sélection de l'icône météo en fonction du temps
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Affichage des données météo et masquage du message d'erreur
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        searchBox.style.color = "black"; // Réinitialisation de la couleur du champ de recherche
    }

}

// Événement lors du clic sur le bouton de recherche
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Appel de la fonction checkWeather avec la valeur du champ de recherche
})