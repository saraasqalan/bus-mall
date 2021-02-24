'use strict';

var previousImages = [1, 2, 3];
var currentImages = [4, 5, 6];

var allImages = [];


var imageDOM = [
  document.getElementById('left-image'),
  document.getElementById('center-image'),
  document.getElementById('right-image')
];
var reset = document.getElementById('reset-button');

var countdown = 25;

var objectNames = [];
var objectShowings = [];
var objectClickings = [];

var Image = function (imageName, fileFormat) {
  this.name = imageName;
  this.filePath = './img/' + imageName + '.' + fileFormat;
  this.valid = true;
  this.timesShown = 0;
  this.timesClicked = 0;
};

allImages.push(
  new Image('bag', 'jpg'),
  new Image('banana', 'jpg'),
  new Image('bathroom', 'jpg'),
  new Image('boots', 'jpg'),
  new Image('breakfast', 'jpg'),
  new Image('bubblegum', 'jpg'),
  new Image('chair', 'jpg'),
  new Image('cthulhu', 'jpg'),
  new Image('dog-duck', 'jpg'),
  new Image('dragon', 'jpg'),
  new Image('pen', 'jpg'),
  new Image('pet-sweep', 'jpg'),
  new Image('scissors', 'jpg'),
  new Image('shark', 'jpg'),
  new Image('sweep', 'png'),
  new Image('tauntaun', 'jpg'),
  new Image('unicorn', 'jpg'),
  new Image('usb', 'gif'),
  new Image('water-can', 'jpg'),
  new Image('wine-glass', 'jpg')
);

Image.prototype.convertToImgTag = function () {
  return '<img id="' + this.name + '" src="' + this.filePath + '" >';
};

var randomIndex = function () {
  return Math.floor(Math.random() * allImages.length);
};


var updateImages = function () {
  for (var j = 0; j < imageDOM.length; j++){
    imageAtIndex(previousImages[j]).valid = true;
    previousImages[j] = currentImages[j];
    while (imageAtIndex(currentImages[j]).valid === false) {
      currentImages[j] = randomIndex();
    }
    imageAtIndex(currentImages[j]).valid = false;
  }
};


var imageAtIndex = function (index) {
  return allImages[index];
};


var updatePage = function () {
  for (var k = 0; k < imageDOM.length; k++) {
    imageDOM[k].innerHTML = '';
    imageDOM[k].innerHTML = imageAtIndex(currentImages[k]).convertToImgTag();
  }
};



var updateShown = function () {
  for (var l = 0; l < 3; l++) {
    imageAtIndex(currentImages[l]).timesShown++;
    imageAtIndex(currentImages[l]).valid = false;
  }
};

var clearImages = function () {
  imageDOM[0].removeEventListener('click', oneClicked);
  imageDOM[1].removeEventListener('click', twoClicked);
  imageDOM[2].removeEventListener('click', threeClicked);
};


var putDataInArrays = function () {
  for (var p = 0; p < allImages.length; p++){
    objectNames[p] = localStorage['name for image #' + p];
    objectShowings[p] = parseInt(localStorage['image showings for image #' + p]);
    objectClickings[p] = parseInt(localStorage['image clickings for image #' + p]);
  }
};



var refresh = function () {
  updateShown();
  updateImages();
  updatePage();
};




var saveProgress = function () {
  localStorage.savedCountdown = countdown;
  for (var saveSlot = 0; saveSlot < allImages.length; saveSlot++) {
    localStorage['name for image #' + saveSlot] = imageAtIndex(saveSlot).name;
    localStorage['image showings for image #' + saveSlot] = imageAtIndex(saveSlot).timesShown;
    localStorage['image clickings for image #' + saveSlot] = imageAtIndex(saveSlot).timesClicked;
  }
};


var loadProgress = function () {
  countdown = parseInt(localStorage.savedCountdown);
  for (var loadSlot = 0; loadSlot < allImages.length; loadSlot++) {
    imageAtIndex(loadSlot).name = localStorage['name for image #' + loadSlot];
    imageAtIndex(loadSlot).timesShown = parseInt(localStorage['image showings for image #' + loadSlot]);
    imageAtIndex(loadSlot).timesClicked = parseInt(localStorage['image clickings for image #' + loadSlot]);
  }
};

let makeChart = function () {
  let ctx = document.getElementById('dataChart').getContext('2d');
  ctx.canvas.width = '1000';
  ctx.canvas.height = '250';
  let chart = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: objectNames,
      datasets: [{
        label: "Times Seen",
        borderWidth: 1,
        backgroundColor: 'rgb(209, 157, 235)',
        borderColor : 'rgb(64, 9, 92)',
        data: objectShowings,
      },
      {
        label: "Times Clicked",
        borderWidth: 1,
        backgroundColor: 'rgb(64, 9, 92)',
        borderColor:  'rgb(209, 157, 235)',
        data: objectClickings,
      }]
    }
  });
  localStorage.firstTime = false;
};




var startUp = function () {
  refresh();
  if (localStorage.savedCountdown) {
    loadProgress();
  }
};

startUp();

imageDOM[0].addEventListener('click', oneClicked);
imageDOM[1].addEventListener('click', twoClicked);
imageDOM[2].addEventListener('click', threeClicked);
reset.addEventListener('click', resetClick);



function oneClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[0]).timesClicked++;
    refresh();
    saveProgress();
    countdown--;
  } else {
    clearImages();
    putDataInArrays();
    makeChart();
  }
}


function twoClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[1]).timesClicked++;
    refresh();
    saveProgress();
    countdown--;
  } else {
    clearImages();
    putDataInArrays();
    makeChart();
  }
}



function threeClicked () {
  if (countdown > 0) {
    imageAtIndex(currentImages[2]).timesClicked++;
    refresh();
    saveProgress();
    countdown--;
  } else {
    clearImages();
    putDataInArrays();
    makeChart();
  }
}


function resetClick () {
  startUp();
  countdown = 25;
  localStorage.savedCountdown = countdown;
  imageDOM[0].addEventListener('click', oneClicked);
  imageDOM[1].addEventListener('click', twoClicked);
  imageDOM[2].addEventListener('click', threeClicked);
}
