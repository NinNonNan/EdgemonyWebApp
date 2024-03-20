console.log("Qualsiasi cosa");

const sepiaRange = document.getElementById("sepiaRange");
const grayscaleRange = document.getElementById("grayscaleRange");
const blurRange = document.getElementById("blurRange");
const brightnessRange = document.getElementById("brightnessRange");
const contrastRange = document.getElementById("contrastRange");
const saturationRange = document.getElementById("saturationRange");
const imageElement = document.getElementById("image");

sepiaRange.addEventListener("input",updateFilter);
grayscaleRange.addEventListener("input",updateFilter);
blurRange.addEventListener("input",updateFilter);
brightnessRange.addEventListener("input",updateFilter);
contrastRange.addEventListener("input",updateFilter);
saturationRange.addEventListener("input",updateFilter);

function updateFilter(){
    const sepiaValue = sepiaRange.value;
    const grayscaleValue = grayscaleRange.value;
    const blurValue = blurRange.value;
    const brightnessValue = brightnessRange.value;
    const contrastValue = contrastRange.value;
    const saturationValue = saturationRange.value;


    const filter = 
        `sepia(${sepiaValue}%)
        grayscale(${grayscaleValue}%)
        blur(${blurValue}px)
        brightness(${brightnessValue}%)
        contrast(${contrastValue}%)
        saturate(${saturationValue}%)`;


    //const filter = `sepia(${sepiaValue}%)`;
    //const filter = `grayscale(${grayscaleValue}%)`;
    //const filter = `blur(${blurValue}px)`;
    //const filter = `brightness(${brightnessValue}%)`;
    //const filter = `contrast(${contrastValue}%)`;
    //const filter = `saturate(${saturationValue}%)`;
    

    imageElement.style.filter = filter;
    console.log.clear;
    console.log("Image filter:" + imageElement.style.filter);
    console.log(filter);
}

