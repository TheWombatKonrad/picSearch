
function fetchAllProducts(){
    fetch('https://pixabay.com/api/?key=25658875-3601e714d590ab74e25d582c9&q=black+flowers&image_type=photo')
      .then(response => 
          response.json())
      .then(data => {
          
        var images = [];
        
        if(data.hits.length >= 10)
        {
                images = data.hits.slice(0,10);
        }
        console.log("images", images);
          for(let i = 0; i < images.length; i++)
            {
                var elem = document.createElement("img");
                elem.setAttribute("src", images[i].previewURL);
          
          var tags = document.createElement("span");
                tags.textContent = images[i].tags;
          
          document.getElementById("placehere").appendChild(tags);
          document.getElementById("placehere").appendChild(elem);
          
            }
    });
    }
    
