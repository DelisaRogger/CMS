const detailContainer = document.querySelector(".jacket-specific-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");

const detailUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;
const loader = document.getElementById("loader");

async function fetchDetails() {
    try {
        loader.style.display = "block";
      
        const response = await fetch(detailUrl);
        const details = await response.json();

        document.title = details.title;

        createHtml(details);

    } catch (error) {
        detailContainer.innerHTML = `<p>Opps! There seems to be an error loading the product details. Try again later.: ${error.message}</p>`;
        
    } finally {
      loader.style.display = "none";
    }

}


fetchDetails();

function createHtml(details) {
    detailContainer.innerHTML = `
        <img class="specific-img" src="${details.image}" alt="${details.title}" />
      <div class="specific-description">
        <h1>${details.title}</h1>
        <p>${details.description}</p>
        <p class="price-description">$${details.price}</p>
        <label for="size-select">Select Size:</label>
            <select id="size-select">${createSizeOptions()}
            </select>
        <label for="gender">Gender</label>
            <select id="gender">${details.gender}
            <option value="empty">-</option>
            <option value="male">M</option>
            <option value="female">F</option>
            </select>
      </div>        
      <a href="check_out.html" class="cta cta-cart">Add to cart</a>
    `;
}

function createSizeOptions() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return sizes.map((size, index) => `<option value="${index}">${size}</option>`).join("");
}


