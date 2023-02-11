export function createImageCard(image) {
  return `<a href="${image.largeImageURL}" class="large-image">
  <div class="photo-card">
  <div class="image-container">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>
      ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>
      ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>
      ${image.downloads}
    </p>
  </div>
</div>
</a>`;
}
