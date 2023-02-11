import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchImages } from './js/api';
import { createImageCard } from './js/image-card';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let page = 1;

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  loadBtn.hidden = true;
  page = 1;
  gallery.innerHTML = '';
  let searchValue = input.value.trim();

  if (searchValue === '') {
    return;
  }

  const response = await searchImages(searchValue, page);
  let totalImages = response.data.totalHits;
  const images = response.data.hits;

  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    input.value = '';
  } else {
    renderImages(images);

    totalImages -= 40;

    if (totalImages >= 40) {
      loadBtn.hidden = false;
      loadBtn.addEventListener('click', () => {
        page += 1;
        searchImages(searchValue, page);
        renderImages(images);
      });
    } else {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
}

function renderImages(array) {
  for (const item of array) {
    gallery.insertAdjacentHTML('beforeend', createImageCard(item));
  }
}
