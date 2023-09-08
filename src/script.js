const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = "live_OTZ0kZEMYSwxwDnB16kaxm9MCIbUXWeuUaCndnhlVeVaPIZzx5rHDkvio8Le0nJh";
let storedBreeds = [];

// Функція для відображення/приховування завантажувача
function toggleLoader(showLoader) {
  const loader = document.querySelector('.loader');
  if (showLoader) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

toggleLoader(true); // Початково показуємо завантажувач

fetch(url, {
  headers: {
    'x-api-key': api_key
  }
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data = data.filter((img) => img.image?.url != null);
    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      if (!breed.image) continue;

      option.value = i;
      option.innerHTML = `${breed.name}`;
      document.getElementById('breed_selector').appendChild(option);
    }

    // По закінченню завантаження списку порід ховаємо завантажувач
    toggleLoader(false);

    // Показуємо першу поріду за замовчуванням
    showBreedImage(0);
  })
  .catch(function (error) {
    console.log(error);
  });

  function showBreedImage(index) {
    toggleLoader(true); // Показуємо завантажувач під час запиту інформації про кота
  
    document.getElementById('breed_image').src = storedBreeds[index].image.url;
    document.getElementById('breed_h').textContent = storedBreeds[index].name;
    document.getElementById('breed_json').textContent = storedBreeds[index].description;
    document.getElementById('breed_temp').textContent =
      'Temperament: ' + storedBreeds[index].temperament;
  
    const breedImage = document.getElementById('breed_image');
    breedImage.onload = function () {
      // Після завершення завантаження зображення ховаємо завантажувач
      toggleLoader(false);
    };
    breedImage.onerror = function () {
      // У випадку помилки завантаження зображення також ховаємо завантажувач
      toggleLoader(false);
    };
  }
  