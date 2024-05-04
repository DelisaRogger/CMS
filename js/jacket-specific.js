const detailContainer = document.querySelector(".jacket-specific-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");

const detailUrl = `https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products/${id}`;
const loader = document.getElementById("loader");

async function fetchDetails() {
    try {
        loader.style.display = "block";
      
        const response = await fetch(detailUrl);
        const details = await response.json();

        document.title = details.name;

        createHtml(details);

    } catch (error) {
        detailContainer.innerHTML = `<p>Oops! There seems to be an error loading the product details. Try again later.: ${error.message}</p>`;
        
    } finally {
      loader.style.display = "none";
    }

}


fetchDetails();

function createHtml(details) {
    detailContainer.innerHTML = `
      <img class="product-img" src="${details.images[0].src}" alt="${details.name}" />
      <div class="specific-description">
        <h1>${details.name}</h1>
        <p>${details.description}</p>
        <p class="price-description">$${details.price}</p>
        <label for="size-select">Select Size:</label>
            <select id="size-select">${createSizeOptions()}
            </select>
        <label for="gender">Gender</label>
            <select id="gender">
            <option value="empty">-</option>
            <option value="male">M</option>
            <option value="female">F</option>
            </select>
      </div>        
      <a href="check_out.html" class="cta cta-cart">Add to cart</a>
    `;
}
