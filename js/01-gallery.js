import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryEl = document.querySelector('.gallery');

const galleryItemsList = galleryItems.map(item => 
    `<div class="gallery__item">
  <a class="gallery__link" target="_self" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`
).join('');
galleryEl.insertAdjacentHTML("afterbegin", galleryItemsList);

galleryEl.addEventListener("click", galleryClick);


let instance;

function onEscClick(event) {
  if (event.keyCode === 27) {
    instance.close();
    return;
  }
}

function galleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  instance = basicLightbox.create(
    `<img class="modal-img" src="">`,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscClick);
      },
    },
    {
      onClose: () => {
        window.removeEventListener('keydown', onEscClick);
      },
    },
  );
  instance.element().querySelector('.modal-img').src =
    event.target.dataset.source;

  instance.show();
}



