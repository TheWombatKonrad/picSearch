
let startParams = new URLSearchParams({
    key: '25658759-75048e1e43fe34cc1d40a96f8',
    page: 1,
    per_page: 10,
  });

let currentPage = 1;
let totalHits;
let input = '';
let color;

retrievePictures(startParams);

async function retrievePictures(params){
  console.log("heeeeej")
  let images = await fetch('https://pixabay.com/api/?' + params.toString())
  .then(response => response.json())
  .then (data => {

    let images = data.hits;
    totalHits = data.totalHits;

    for(image of images)
    {
      fetchAllImages(image);
    }
    console.log("heeeeej")
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
}

async function nextPage(){

  if (currentPage > 1){
    currentPage + 1;
  }
  else{currentPage = 1; }

  if( currentPage == 10){
    document.getElementsByClassName(classNames='button-back').hidden = true;
  return }

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

    if((totalHits - imagesShown) <= 0){
      document.getElementsByClassName('button-next').hidden = true;
    }

}

async function backPage(){

 if(currentPage > 0){
  currentPage - 1;
 }
 else{currentPage = 1; }

 if( currentPage == 0){
  document.getElementsByClassName(classNames='button-back').hidden = true;
  return
}
  console.log("hej");
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


}


    if((totalHits - imagesShown) <= 0){
      document.getElementsByClassName('button-back').hidden = true;
    }
}
