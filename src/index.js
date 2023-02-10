import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '33519998-d8f719b1763760ac30c0941da';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  let searchValue = input.value.trim();
  if (searchValue === '') {
    return;
  }
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    if (response.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      input.value = '';
    }
    console.log(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

