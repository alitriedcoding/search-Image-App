const accesskey = "xOKWReu1b43VeoRYWym9PNJDxTlX64fQQqpe-kQ2RIM";
const formEl = document.querySelector("form");
const inputValue = document.getElementById("search-app");
const showMoreEl = document.getElementById("show-more");
const contentValue = document.querySelector(".content");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

let inputeData = "";
let page = 1;

async function searchImage() {
  inputeData = inputValue.value;

  const url = `http://api.unsplash.com/search/photos?page=${page}&
query=${inputeData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    contentValue.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-reasult");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imgeLink = document.createElement("a");
    imgeLink.href = result.links.html;
    imgeLink.target = "_blank";
    imgeLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imgeLink);
    contentValue.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    showMoreEl.style.display = "block";
  }
}

showMoreEl.addEventListener("click", () => {
  searchImage();
});
