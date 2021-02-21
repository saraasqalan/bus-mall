'use strict';
let previousImages = [1, 2, 3];
let currentImages = [4, 5, 6];
let allImages = [];
let imageDOM = [
  document.getElementById('left-image'),
  document.getElementById('center-image'),
  document.getElementById('right-image')
];
let countdown = 25;

let header = document.getElementById('table-header');
let body = document.getElementById('table-body');


let Images = function (imageName, fileFormat) {
  this.name = imageName;
  this.filePath = './img/' + imageName + '.' + fileFormat;
  this.timesShown = 0;
  this.timesClicked = 0;
};

allImages.push(
  new Images('bag', 'jpg'),
  new Images('banana', 'jpg'),
  new Images('bathroom', 'jpg'),
  new Images('boots', 'jpg'),
  new Images('breakfast', 'jpg'),
  new Images('bubblegum', 'jpg'),
  new Images('chair', 'jpg'),
  new Images('cthulhu', 'jpg'),
  new Images('dog-duck', 'jpg'),
  new Images('dragon', 'jpg'),
  new Images('pen', 'jpg'),
  new Images('pet-sweep', 'jpg'),
  new Images('scissors', 'jpg'),
  new Images('shark', 'jpg'),
  new Images('sweep', 'png'),
  new Images('tauntaun', 'jpg'),
  new Images('unicorn', 'jpg'),
  new Images('usb', 'gif'),
  new Images('water-can', 'jpg'),
  new Images('wine-glass', 'jpg')
);




Images.prototype.convertToImgTag = function () {
  return '<img id="' + this.name + '" src="' + this.filePath + '" >';
};


let randomIndex = function () {
  return Math.floor(Math.random() * allImages.length);
};


let updateImages = function () {
  for (let j = 0; j < imageDOM.length; j++){
    imageAtIndex(previousImages[j]).valid = true;
    previousImages[j] = currentImages[j];
    while (imageAtIndex(currentImages[j]).valid === false) {
      currentImages[j] = randomIndex();
    }
  }
};


let imageAtIndex = function (index) {
  return allImages[index];
};

let updatePage = function () {
  for (let k = 0; k < imageDOM.length; k++) {
    imageDOM[k].innerHTML = '';
    imageDOM[k].innerHTML = imageAtIndex(currentImages[k]).convertToImgTag();
  }
};


let updateShown = function () {
  for (let l = 0; l < 3; l++) {
    imageAtIndex(currentImages[l]).timesShown++;
    imageAtIndex(currentImages[l]).valid = false;
  }
};



let clearImages = function () {
  imageDOM[0].removeEventListener('click', oneClicked);
  imageDOM[1].removeEventListener('click', twoClicked);
  imageDOM[2].removeEventListener('click', threeClicked);
  for (let m = 0; m < imageDOM.length; m++) {
    imageDOM[m].style.visibility = 'hidden';
  }
};


let makeCell = function (input, parent, type) {
  let cell = document.createElement(type);
  cell.innerHTML = input;
  parent.appendChild(cell);
};


let makeTable = function () {

  let headerRow = document.createElement('tr');
  makeCell('Images', header, 'th');
  makeCell('Times Seen', header, 'th');
  makeCell('Times Clicked', header, 'th');
  header.appendChild(headerRow);


  for (let o = 0; o < allImages.length; o++) {
    let tableRow = document.createElement('tr');
    makeCell(allImages[o].name, body, 'th');
    makeCell(allImages[o].timesShown, body, 'td');
    makeCell(allImages[o].timesClicked, body, 'td');
    body.appendChild(tableRow);
  }
};




let refresh = function () {
  updateShown();
  updateImages();
  updatePage();
};

refresh();


imageDOM[0].addEventListener('click', oneClicked);
imageDOM[1].addEventListener('click', twoClicked);
imageDOM[2].addEventListener('click', threeClicked);



function oneClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[0]).timesClicked++;
    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}



function twoClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[1]).timesClicked++;
    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}



function threeClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[2]).timesClicked++;
    refresh();
    countdown--;
  } else {
    clearImages();
    makeTable();
  }
}
