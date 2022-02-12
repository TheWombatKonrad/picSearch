start();

async function start(){

  let pictureTemplate = document.querySelector('#picture-template');
  pictureTemplate.remove;

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

    //let pic = document.createElement('img');
    //pic.setAttribute('src', image.previewURL);
      //img in createElement = tag name, specifies the type of element created
      //setAttribute adds url into src in html

    //let user = document.createElement('span');
    //user.textContent = image.user;

    //let tags = document.createElement('span');
    //tags.textContent = image.tags;

    let listItem = pictureTemplate.content.firstElementChild.cloneNode(true);
    listItem.querySelector('.pic').setAttribute('src', image.webformatURL);
    listItem.querySelector('.user').textContent = image.user;
    listItem.querySelector('.tags').textContent = image.tags;

    listItem.append();

  }//fetchAllImages
}//start



//? before key????
//q search term
//color Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
//page returned results are pageinated, parameter selects page
//per_page default 20
//total = total number of hits
//totalHits = hits returned by api, default max 500
//user = name of contributor
