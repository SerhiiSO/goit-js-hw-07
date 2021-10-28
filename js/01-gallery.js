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
function onKeyboardClick(event) {
      if (event.code === 'Escape') { 
          instance.close();
          // window.removeEventListener('keydown', onKeyboardClick);
        };
    };

function galleryClick(event) {
    event.preventDefault();
    instance = basicLightbox.create(`
  <div class="modal">
  <img src="${event.target.dataset.source}" class="js-modal-img" width="800" height="600">
  </div>
`, {
      onShow: (instance) => {
    window.addEventListener("keydown", onKeyboardClick);
    instance.element().querySelector('.js-modal-img').addEventListener("click", () => {
      instance.close();
    });
      },
      onClose: (instance) => {
        
        if (event.code === 'Escape') {
          window.removeEventListener('keydown', onKeyboardClick);
          instance.close();
        }

  }
    }).show();
  
}
console.log(galleryItemsList);
