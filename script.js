let startParams = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
    page: 1,
    per_page: 10,
  });

let currentPage = 1;

retrievePictures(startParams);

async function retrievePictures(params){

  let images = await fetch('https://pixabay.com/api/?' + params.toString())
  .then(response => response.json())
  .then (data => {

    var images = data.hits;

    for(image of images)
    {
      fetchAllImages(image);
    }
  });

//===================================

  function fetchAllImages(image){

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

async function searchAPI(){

  let input = document.getElementById('searchbar').value.toLowerCase();

  let params = new URLSearchParams({
      key: '25658759-75048e1e43fe34cc1d40a96f8',
      q: input,
      page: 1,
      per_page: 10,
    });

  document.getElementById('pictureContainer').innerHTML = null;

  await retrievePictures(params);
}

async function nextPage(){

  let params = new URLSearchParams({
      key: '25658759-75048e1e43fe34cc1d40a96f8',
      page: currentPage + 1,
      per_page: 10,
    });

    currentPage++;

    document.getElementById('pictureContainer').innerHTML = null;

    await retrievePictures(params);
}

async function backPage(){

  let params = new URLSearchParams({
      key: '25658759-75048e1e43fe34cc1d40a96f8',
      page: currentPage - 1,
      per_page: 10,
    });

    currentPage--;

    document.getElementById('pictureContainer').innerHTML = null;

    await retrievePictures(params);
}


//q search term
//color Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
//total = total number of hits
//totalHits = hits returned by api, default max 500
//user = name of contributor
