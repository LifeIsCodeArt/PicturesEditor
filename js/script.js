const  fileInput = document.querySelector('.file-input');
const  chooseImageBtn = document.querySelector('.choose-img');
const  saveImageBtn = document.querySelector('.save-img');
const  resetFilterBtn = document.querySelector('.reset-filter');
const  previewImage = document.querySelector('.preview-img img');
const rotateOptions = document.querySelectorAll('.rotate button');
const filterOptions = document.querySelectorAll('.filter button');
const  filterName = document.querySelector('.filter-info .name');
const  filterValue = document.querySelector('.filter-info .value');
const  filterSlider = document.querySelector('.slider input');
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
const applyFilters = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; // получаем файл который выбрал юзер
    if (!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener('load', () => {
        document.querySelector('.container').classList.remove("disable")
    })
}

filterOptions.forEach(option =>{
    option.addEventListener("click", () =>{
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = 200;
            filterSlider.value = brightness;
            
        }
         else if(option.id === "saturation") {
            filterSlider.max = 200;
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion") {
            filterSlider.max = 100;
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else{
            filterSlider.max = 100;
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active");
    if(selectedFilter.id == "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id == "saturation") {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id == "inversion") {
        inversion = filterSlider.value;
    }
    else {
        grayscale = filterSlider.value;
    }
    applyFilters();

}

rotateOptions.forEach(option =>{
    option.addEventListener("click", () => {
       if(option.id === "left"){
        rotate -= 90
       }  else if(option.id === "right"){
        rotate += 90
       } else if(option.id === "horizontal"){
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
       } else {
        flipVertical = flipVertical === 1 ? -1 : 1;
       }
       applyFilters();
    } )
})

const resetFilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
  rotate = 0, flipVertical = 1, flipHorizontal = 1;
  filterOptions[0].click();
  applyFilters()
}

const saveImage = () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;


    ctx.filter = `brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})`;
    ctx.scale(flipVertical, flipHorizontal);
    ctx.drawImage(previewImage, -canvas.widht / 2, -canvas.height / 2, canvas.width, canvas.height);
    const data = canvas.toDataURL(`image/png`)
    if (!window.open(data)){
        document.location.href=data
    }
    document.body.appendChild(canvas);
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
saveImageBtn.addEventListener('click', saveImage);
chooseImageBtn.addEventListener('click', () => fileInput.click());

