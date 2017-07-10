'use strict';

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderImage(imageData, keySearch) {
  document.getElementById('image-wrap').href = imageData.url;
  document.getElementById('image').src = imageData.fixed_height_downsampled_url;
  renderButton(imageData, keySearch);
  // img-random
}
// arrows.png

function renderButton(imageData, keySearch) {
  var searchName = document.getElementById("search-name");
  searchName.setAttribute('href', imageData.fixed_height_downsampled_url);
  searchName.setAttribute('download', '');
  //download
  var imageDownload = document.getElementById("img-search");
  imageDownload.src = '/images/freepik.jpg';
  imageDownload.width = '50';
  imageDownload.height = '50';
  imageDownload.alt = 'Downloads';
  //random iamge
  var imageRandom = document.getElementById("img-random");
  imageRandom.src = '/images/arrows.png';
  imageRandom.width = '50';
  imageRandom.height = '50';
  imageRandom.alt = 'Random images';
  imageRandom.setAttribute('keySearch', keySearch);
}

async function getTagsUrl(keySearch = 'troll+meme') {
  let url = 'https://api.giphy.com/v1/gifs/random?api_key=710f1da57c7e48d9a0f2331709ceb279&tag=' + keySearch;
  let result = await fetch(url);
  let jsonResult = await result.json();
  renderImage(jsonResult.data, keySearch);
}

document.addEventListener('DOMContentLoaded', async () => {
  renderStatus('Loading ...');
  await getTagsUrl();
  renderStatus('');
});
// document.addEventListener("keydown", keyDownTextField, false);

// function keyDownTextField(e) {
//
//   var unicode = e.keyCode ? e.keyCode : e.charCode;
//   var typing = document.getElementById('search').value + String.fromCharCode(unicode);
//   console.log(typing);
//
//   var lblValue = document.getElementById("search-name");
//   lblValue.innerText = "The text box contains: " + typing.toLowerCase();
// }

function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this,
      args = arguments;

    var executeFunction = function () {
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  };
};


document.getElementById("search").onkeypress = debounce(async function () {
  var keySearch = document.getElementById('search').value;
  renderStatus('Loading ...');
  await getTagsUrl(keySearch);
  renderStatus('');
}, 500);

var imgRandom = document.getElementById("img-random");
imgRandom.addEventListener("click", async function () {
  var keySearch = imgRandom.getAttribute('keySearch');
  console.log(keySearch);
  renderStatus('Loading ...');
  await getTagsUrl(keySearch);
  renderStatus('');
});

