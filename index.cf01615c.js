var url="https://api.thecatapi.com/v1/breeds",api_key="live_OTZ0kZEMYSwxwDnB16kaxm9MCIbUXWeuUaCndnhlVeVaPIZzx5rHDkvio8Le0nJh",storedBreeds=[];function showBreedImage(e){document.getElementById("breed_image").src=storedBreeds[e].image.url,document.getElementById("breed_json").textContent=storedBreeds[e].temperament,document.getElementById("wiki_link").href=storedBreeds[e].wikipedia_url,document.getElementById("wiki_link").innerHTML=storedBreeds[e].wikipedia_url}fetch(url,{headers:{"x-api-key":api_key}}).then((function(e){return e.json()})).then((function(e){e=e.filter((function(e){var t;return null!=(null===(t=e.image)||void 0===t?void 0:t.url)})),storedBreeds=e;for(var t=0;t<storedBreeds.length;t++){var n=storedBreeds[t],r=document.createElement("option");n.image&&(r.value=t,r.innerHTML="".concat(n.name),document.getElementById("breed_selector").appendChild(r))}showBreedImage(0)})).catch((function(e){console.log(e)}));
//# sourceMappingURL=index.cf01615c.js.map
