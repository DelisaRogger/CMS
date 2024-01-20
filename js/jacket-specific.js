const detailContainer = document.querySelector(".specific-description");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");

const detailUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;

async function fetchDetails() {
    try {
        detailContainer.innerHTML = `<div class="loader"></div>`;
        const response = await fetch(detailUrl);
        const details = await response.json();

        document.title = details.title;

        createHtml(details);

    } catch (error) {
        detailContainer.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

fetchDetails();

function createHtml(details) {
    detailContainer.innerHTML = `
        <img class="specific-img" src="${details.image}" alt="${details.title}" />
        <h1>${details.title}</h1>
        <p>${details.description}</p>
        <p class="price-description">$${details.price}</p>
        <a href="check_out.html" class="cta cta-cart">Add to cart</a>
    `;
}