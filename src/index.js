import './styles/styles.css';

import { getCatBreeds, createCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';


const ref = {
  breedSelect: document.querySelector('.breed-select'),
  loaderMassage: document.querySelector('.loader'),
  errorMassage: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

ref.loaderMassage.classList.remove('is-hidden');
ref.errorMassage.classList.add('is-hidden');

let isFirstSelection = false;

getCatBreeds()
  .then(data => {
    const elements = data.map(element => ({
      text: element.name,
      value: element.id,
    }));

    new SlimSelect({
      select: ref.breedSelect,
      data: elements,
    });
  })

  .catch(error => {
    Notiflix.Report.warning(
      'We got some problems'
    );
    console.log(error);
    throw error;
  });

ref.breedSelect.addEventListener('change', evt => {
  if (!isFirstSelection) {
    isFirstSelection = true;

    ref.loaderMassage.classList.add('is-hidden');


    return;
  }
  ref.catCard.innerHTML = '';
  ref.loaderMassage.classList.remove('is-hidden');
  const selectedBreedId = evt.currentTarget.value;

  createCatByBreed(selectedBreedId)
    .then(data => {
      const { breeds, url } = data[0];

      ref.catCard.innerHTML = ` 

        <div class="cat-card">
          <div class="wrap-img">
            <img src="${url}" alt="${breeds[0].name}" width="300"/>
          </div>
          <div class="wrap-description">
            <h2>${breeds[0].name}</h2>
            <p class="description"><span class="wrap-key">Origin: </span>${breeds[0].origin}</p>
            <p class="description"><span class="wrap-key">Description: </span>${breeds[0].description}</p>
            <p class="description"><span class="wrap-key">Temperament: </span>${breeds[0].temperament}</p>
            <p class="wrap-key" style="color: black; cursor: text;">More information: <a class="link" href="${breeds[0].wikipedia_url}" target="_blank" rel="nofollow"  class="wikipedia-link" style="text-decoration: none;">WIKIPEDIA</a></p>
            
          </div>
        </div> 
        `;
      ref.loaderMassage.classList.add('is-hidden');
    })
    .catch(error => console.log(error))
});