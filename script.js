start();

async function start(){

let params = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
  });

  let images = await fetch('https://pixabay.com/api/?' + params.toString())
  .then(response => response.json())
  .then (data => {

    var images = [];

    if(data.hits.length >= 10)
    {
      images = data.hits.slice(0,10);
    }

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

//q search term
//color Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
//page returned results are pageinated, parameter selects page
//per_page default 20
//total = total number of hits
//totalHits = hits returned by api, default max 500
//user = name of contributor
