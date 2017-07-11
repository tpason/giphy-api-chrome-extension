'use strict';

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderImage(imageData, keySearch) {
  if (imageData != '') {
    document.getElementById('image-wrap').href = imageData.url;
    document.getElementById('image').src = imageData.fixed_height_downsampled_url;
    debounce(renderButton(imageData, keySearch), 500);
  } else {
    document.getElementById('image-wrap').href = 'javascript:void(0)';
    document.getElementById('image').src = '/images/404.gif';

    // remove all child elements
    var list = document.getElementsByClassName("wrap-img");
    for (var i = list.length - 1; 0 <= i; i--) {
      if (list[i] && list[i].parentElement) {
        list[i].parentElement.removeChild(list[i]);
      }
    }
  }
}

function renderButton(imageData, keySearch) {
  var searchName = document.getElementById("search-name");
  if (searchName === null) {
    var list = document.createElement("div");
    list.setAttribute('class', 'wrap-img');
    document.body.appendChild(list);
    searchName = document.createElement("a");
    searchName.setAttribute('id', 'search-name');
    list.appendChild(searchName);
  }
  searchName.setAttribute('href', imageData.fixed_width_downsampled_url);
  searchName.setAttribute('download', '');

  //download
  var imageDownload = document.getElementById("img-search");
  if (imageDownload === null) {
    imageDownload = document.createElement("IMG");
    imageDownload.setAttribute('id', 'img-search');
    imageDownload.src = '/images/freepik.jpg';
    imageDownload.width = '50';
    imageDownload.height = '50';
    imageDownload.alt = 'Downloads';
    var searchName = document.getElementById("search-name");
    searchName.appendChild(imageDownload);
  }
  //random image
  var imageRandom = document.getElementById("img-random");
  if (imageRandom === null) {
    imageRandom = document.createElement("IMG");
    imageRandom.setAttribute('id', 'img-random');
    imageRandom.src = '/images/arrows.png';
    imageRandom.width = '50';
    imageRandom.height = '50';
    imageRandom.alt = 'Random images';
    list.appendChild(imageRandom);
    debounce(imageRandom.addEventListener("click", async function () {
      clickRandom(imageRandom);
    }), 500);
  }
  imageRandom.setAttribute('keySearch', keySearch);
}
async function clickRandom(imageRandom) {
  var keySearch = imageRandom.getAttribute('keySearch');
  console.log(keySearch);
  renderStatus('Loading ...');
  await getTagsUrl(keySearch);
  renderStatus('');
}

async function getTagsUrl(keySearch = 'troll+meme') {
  let url = 'https://api.giphy.com/v1/gifs/random?api_key=710f1da57c7e48d9a0f2331709ceb279&tag=' + keySearch;
  let result = await fetch(url);
  let jsonResult = await result.json();
  renderImage(jsonResult.data, keySearch)
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

document.addEventListener('DOMContentLoaded', async () => {
  var imageRandom = document.getElementById("img-random");
  //event click random gif
  debounce(imageRandom.addEventListener("click", async function () {
    clickRandom(imageRandom);
  }), 500);
});