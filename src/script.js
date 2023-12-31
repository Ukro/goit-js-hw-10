import { fetchBreeds } from './api.js';

//import Notiflix from 'notiflix';

let storedBreeds = [];

function toggleLoader(showLoader) {
  const loader = document.querySelector('.loader');
  if (showLoader) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

function showError(message) {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function showBreedInformation(index) {
  const breedImage = document.getElementById('breed_image');
  const breedH = document.getElementById('breed_h');
  const breedJson = document.getElementById('breed_json');
  const breedTemp = document.getElementById('breed_temp');
  const errorElement = document.querySelector('.error'); // Отримуємо елемент error

  //Скрываем изображение и описание перед загрузкой
  breedImage.style.display = 'none';
  breedH.style.display = 'none';
  breedJson.style.display = 'none';
  breedTemp.style.display = 'none';

  if (index >= 0 && index < storedBreeds.length) {
    // Показываем загрузчик перед загрузкой изображения
    toggleLoader(true);

    if (!storedBreeds[index].image || !storedBreeds[index].image.url) {
      // Перевірка наявності змінної url у обраного елемента
      toggleLoader(false);
    
      errorElement.style.display = 'error';

      errorElement.style.display = 'block';
      return;
    }

    breedImage.onload = function () {
      //После успешной загрузки изображения отображаем его
      breedImage.style.display = 'block';
      breedH.style.display = 'block';
      breedJson.style.display = 'block';
      breedTemp.style.display = 'block';

      // Скрываем загрузчик после успешной загрузки изображения
      toggleLoader(false);
      errorElement.style.display = 'none'; // При успішній загрузці елемента, ховаємо errorElement
    };

    breedImage.onerror = function () {
      // Скрываем загрузчик в случае ошибки загрузки изображения
      toggleLoader(false);
    };

    breedImage.src = storedBreeds[index].image.url;
    breedH.textContent = storedBreeds[index].name;
    breedJson.textContent = storedBreeds[index].description;
    breedTemp.textContent = 'Temperament: ' + storedBreeds[index].temperament;
  }
}

(async function () {
  toggleLoader(true);
  try {
    storedBreeds = await fetchBreeds();

    const breedSelector = document.getElementById('selectElement');

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = `${breed.name}`;
      breedSelector.appendChild(option);
    }

    breedSelector.addEventListener('change', function () {
      showBreedInformation(breedSelector.value);
    });

    toggleLoader(false);
    breedSelector.style.display = 'block'; // Показываем селектор после загрузки
  } catch (error) {
    toggleLoader(false);
  }
})();
