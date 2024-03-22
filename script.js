console.log("Qualsiasi cosa");

// STEP 1: getElementById
const changeImageButton = document.getElementById('changeImageButton');
const downloadOriginalImageButton = document.getElementById('downloadOriginalImage');
// Aggiungi l'evento click al pulsante per scaricare l'immagine con i filtri applicati
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
downloadOriginalImageButton.addEventListener('click',downloadOriginalImage);
downloadFilteredImageButton.addEventListener('click', downloadFilteredImage);

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
    const imageUrl = `https://picsum.photos/id/${randomImageId}/640/480`;
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

function downloadOriginalImage() {
    // Crea un link per aprire l'immagine in una nuova pagina
    var link = document.createElement('a');
    link.href = imageElement.src; // Ottieni l'URL dell'immagine originale
    link.target = '_blank'; // Apri il link in una nuova pagina
    // Aggiungi un testo di fallback nel caso il link non funzioni correttamente
    link.textContent = "Clicca qui per visualizzare l'immagine";
    // Aggiungi il link al DOM
    document.body.appendChild(link);
    // Simula un clic sul link per aprirlo nella nuova pagina
    link.click();
    // Rimuovi il link dal DOM
    document.body.removeChild(link);
    }

function downloadFilteredImage() {
    // Crea un canvas temporaneo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Imposta le dimensioni del canvas come le dimensioni dell'immagine
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Disegna l'immagine sull'canvas con i filtri applicati
    ctx.filter = imageElement.style.filter;
    ctx.drawImage(imageElement, 0, 0);

    // Converti il canvas in un URL dati
    const dataURL = canvas.toDataURL('image/png');

    // Crea un link per scaricare l'immagine
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'filtered_image.png'; // Imposta il nome del file da scaricare

    // Aggiungi il link al DOM
    document.body.appendChild(link);

    // Simula un clic sul link per avviare il download
    link.click();

    // Rimuovi il link dal DOM
    document.body.removeChild(link);
    }

    changeImage();

