import axios from 'axios';

const API_KEY = '33519998-d8f719b1763760ac30c0941da';
const BASE_URL = 'https://pixabay.com/api/';

export async function searchImages(query, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
