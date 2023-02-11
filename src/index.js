import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchImages } from './js/api';
import { createImageCard } from './js/image-card';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
let searchValue = '';
let images = [];
let totalImages = 0;
let page = 1;

let lightbox = new SimpleLightbox('.large-image');

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  loadBtn.hidden = true;
  gallery.innerHTML = '';
  searchValue = input.value.trim();

  if (searchValue === '') {
    return;
  }

  const response = await searchImages(searchValue, page);
  totalImages = response.data.totalHits;
  images = response.data.hits;

  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    input.value = '';
  } else {
    Notify.success(`Hooray! We found ${totalImages} images`);

    renderImages(images);

    if (totalImages >= 40) {
      loadBtn.hidden = false;
      loadBtn.addEventListener('click', onLoadMore);
    } else {
      loadBtn.removeEventListener('click', onLoadMore);
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
  }
}

async function onLoadMore() {
  totalImages -= 40;
  page += 1;
  const response = await searchImages(searchValue, page);
  images = response.data.hits;
  renderImages(images);

  if (totalImages <= 40) {
    loadBtn.hidden = true;
    loadBtn.removeEventListener('click', onLoadMore);
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
}

function renderImages(array) {
  for (const item of array) {
    gallery.insertAdjacentHTML('beforeend', createImageCard(item));
  }
  lightbox.refresh();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
