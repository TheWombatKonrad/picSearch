start();

async function start(){

  let params = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
  });

  let images = await fetch('https://pixabay.com/api/?' + params.toString())
  .then(response => response.json());
  //since then is together with fetch... do we need an await before second response?
  //then returns a promise p.then(onFulfilled[, onRejected]);
  //we don't need laffy's page stuff bc api??
  //console.log('images', images);

//images is not iterable?? :(
//undefined = not yet initialized... but should be?
  for(let image of images){
    fetchAllImages(image);
  }

//===================================

  function fetchAllImages(image){

    let pic = document.createElement('img');
    pic.setAttribute('src', image.previewURL);
      //img in createElement = tag name, specifies the type of element created
      //setAttribute adds url into src in html

    let user = document.createElement('span');
    user.textContent = image.user;

    let tags = document.createElement('span');
    tags.textContent = image.tags;

    document.getElementByClassName('pic').appendChild(image);
    document.getElementByClassName('contributor').appendChild(user);
    document.getElementByClassName('tags').appendChild(tags);

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
