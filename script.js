
let startParams = new URLSearchParams({
  key: '25658759-75048e1e43fe34cc1d40a96f8',
  page: 1,
  per_page: 10,
});

let currentPage = 1;
let totalHits;
let input = '';
let color;

let inputEnter = document.getElementById('searchbar');
inputEnter.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('search-button').click();
  }
});

retrievePictures(startParams);
document.getElementById('button-back-top').hidden = true;
document.getElementById('button-back-bottom').hidden = true;

async function retrievePictures(params) {

  let images = await fetch('https://pixabay.com/api/?' + params.toString())
    .then(response => response.json())
    .then(data => {

      let images = data.hits;
      totalHits = data.totalHits;

      for (image of images) {
        fetchAllImages(image);
      }
    });

  //===================================

  function fetchAllImages(image) {

    let newNode = document.createElement('div');
    newNode.className = 'picture';

    let pic = document.createElement('img');
    pic.setAttribute('src', image.webformatURL);

    let user = document.createElement('span');
    user.textContent = image.user;

    let tags = document.createElement('span');
    tags.textContent = image.tags;


    newNode.appendChild(pic);
    newNode.appendChild(user);
    newNode.appendChild(tags);

    document.getElementById('pictureContainer').appendChild(newNode);

  }//fetchAllImages
}//start

async function searchAPI() {

  input = document.getElementById('searchbar').value.toLowerCase();
  color = document.getElementById('colors').value;

  let params = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
    q: input,
    colors: color,
    page: 1,
    per_page: 10,
  });

  document.getElementById('pictureContainer').innerHTML = null;

  await retrievePictures(params);

  document.getElementById('button-back-top').hidden = true;
  document.getElementById('button-back-bottom').hidden = true;
}

async function nextPage() {

  let params = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
    q: input,
    colors: color,
    page: currentPage + 1,
    per_page: 10,

  });

  currentPage++;

  document.getElementById('pictureContainer').innerHTML = null;

  await retrievePictures(params);

  let imagesShown = currentPage * 10;

  if ((totalHits - imagesShown) <= 0) {
    document.getElementById('button-next-top').hidden = true;
    document.getElementById('button-next-bottom').hidden = true;
  }

  document.getElementById('button-back-top').hidden = false;
  document.getElementById('button-back-bottom').hidden = false;

}

async function backPage() {

  let params = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
    q: input,
    colors: color,
    page: currentPage,
    per_page: 10,
  });

  currentPage--;

  document.getElementById('pictureContainer').innerHTML = null;

  await retrievePictures(params);

  if (currentPage === 1) {
    document.getElementById('button-back-top').hidden = true;
    document.getElementById('button-back-bottom').hidden = true;
  }

  document.getElementById('button-next-top').hidden = false;
  document.getElementById('button-next-bottom').hidden = false;
}
