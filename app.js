/* Select DOM ELements */
const form = document.querySelector('#form');
const showImage = document.querySelector('#show-image');

/* API */
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21525805-2df30f43a034b564c54907ba0';
let searchValue;

/* Get Search Value */
function getSearchValue(e) {
  /* Prevent Defalt */
  e.preventDefault();
  /* Get Value */
  const value = this.querySelector('input').value.trim();

  if (value) {
    getImages(value);
  }
}

/* Get Images */
function getImages(searchValue) {
  const URL = `${BASE_URL}/?key=${API_KEY}&q=${searchValue}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      displayImages(data);
    })
    .catch((err) => console.error(err));
}

/* Display Images */
function displayImages(data) {
  showImage.innerHTML = data.hits
    .map((el) => {
      console.log(el);
      return `
        <div class="col-md-6 col-xl-4 image">
            <a href="${el.pageURL}" target="_blank"
                ><img
                src="${el.webformatURL}"
                alt="${el.tags}"
                class="w-100"
            /></a>
        </div>
      `;
    })
    .join('');
}

/* Event Listener */
form.addEventListener('submit', getSearchValue);
