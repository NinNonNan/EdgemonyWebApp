console.log("Qualsiasi cosa");

// STEP 1: getElementById
const changeImageButton = document.getElementById('changeImageButton');
const downloadFilteredImageButton = document.getElementById('downloadFilteredImage');

const imageElement = document.getElementById('image');
const sepiaRange = document.getElementById('sepiaRange');
const grayscaleRange = document.getElementById('grayscaleRange');
const blurRange = document.getElementById('blurRange');
const brightnessRange = document.getElementById('brightnessRange');
const contrastRange = document.getElementById('contrastRange');
const saturationRange = document.getElementById('saturationRange');
const toggleFilter = document.getElementById('toggleFilter');
// STEP 1.1 SPERIMENTALE
const addSnyderFilter = document.getElementById('addSnyderFilter');

// STEP 2: variabili
let isActive = true;
let isSnyder = false;

// STEP 3: eventi
changeImageButton.addEventListener('click', changeImage);
downloadFilteredImageButton.addEventListener('click',downloadFilteredImage);

sepiaRange.addEventListener('input',updateFilters);
grayscaleRange.addEventListener('input',updateFilters);
blurRange.addEventListener('input',updateFilters);
brightnessRange.addEventListener('input',updateFilters);
contrastRange.addEventListener('input',updateFilters);
saturationRange.addEventListener('input',updateFilters);
toggleFilter.addEventListener('change', switchFilters);
// STEP 3.1 
addSnyderFilter.addEventListener('change',snyderFilter);

// STEP 4: funzioni
function changeImage() {
    const randomImageId = Math.floor(Math.random() * 1000) + 1;
    //const imageUrl = `https://picsum.photos/id/${randomImageId}/640/480`;
    const imageUrl = `https://cors-anywhere.herokuapp.com/https://picsum.photos/id/${randomImageId}/640/480`;
    imageElement.src = imageUrl;
    isActive = true;
    toggleFilter.checked = false;
    // aggiungerlo dopo aver creato il metodo resetFilters
    resetFilters();
}

function updateFilters(){

    const sepiaValue = sepiaRange.value;
    const grayscaleValue = grayscaleRange.value;
    const blurValue = blurRange.value;
    const brightnessValue = brightnessRange.value;
    const contrastValue = contrastRange.value;
    const saturationValue = saturationRange.value;

    const filters = `sepia(${sepiaValue}%) grayscale(${grayscaleValue}%) blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%)`;

        // STEP 5: Condizioni - attenzione al ternario!!!
        imageElement.style.filter = isActive ? filters : 'none';
        imageElement.style.filter = isSnyder ? `saturate(10%)` : filters;

    }
    
function resetFilters() {

    sepiaRange.value = 0;
    grayscaleRange.value = 0;
    blurRange.value = 0;
    brightnessRange.value = 100;
    contrastRange.value = 100;
    saturationRange.value = 100;
    imageElement.style.filter = 'none';

    }

function switchFilters() {

    isActive = !isActive;
    updateFilters();

    }

function snyderFilter() {

    isSnyder = !isSnyder;
    updateFilters();
    }

function downloadFilteredImage() {

    // Seleziona l'elemento del'immagine originale
    
    var canvas = document.createElement('canvas');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    var ctx = canvas.getContext('2d');

    var stileComputed = window.getComputedStyle(imageElement);
    var filtro = stileComputed.getPropertyValue('filter');
    ctx.filter = filtro; // Applica lo stesso filtro sull'immagin

    // Disegna l'immagine con il filtro applicato sul canvas
    ctx.drawImage(imageElement, 0, 0);

    // Crea un link per il download
    var link = document.createElement('a');
    link.download = 'immagine_filtrata.jpg'; // Nome del file da scaricare
    // Converti il canvas in un URL di dati
    link.href = canvas.toDataURL('image/jpeg');
    // Clicca automaticamente sul link per avviare il download
    link.click();
    }

    changeImage();

