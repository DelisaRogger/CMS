import { getQueryStringParam } from "./params.js";
import { url } from "./constants.js";

async function getJacketDetails() {
    const id = getQueryStringParam("id");

    if (!id) {
        document.location.href = `/`; // Redirect to home if ID is missing
    }

    const jacketUrl = `${url}/${id}`;

    try {
        const response = await fetch(jacketUrl);

        if (response.ok === false) {
            throw new Error("There was an error fetching the jacket with id: " + id);
        }

        const jacketDetails = await response.json();

        const detailContainer = document.querySelector("#jacket-specific-container");

        detailContainer.innerHTML = `<div class="specific-img">
            <img src="${jacketDetails.image}" alt="${jacketDetails.title}">
        </div>
        <div class="specific-description">
            <h1>${jacketDetails.title}</h1>
            <p>${jacketDetails.description}</p>
            <p class="price-description">$${jacketDetails.price}</p>
            <form class="size">
                <label for="size">Sizes</label>
                <select id="size" name="size">
                    ${jacketDetails.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
                <label for="colour">Color</label>
                <select id="colour" name="colour">
                    ${jacketDetails.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
            </form>
            <a href="check_out.html" class="cta cta-cart">Add to cart</a>
        </div>`;
    } catch (error) {
        const detailContainer = document.querySelector("#jacket-specific-container");
        detailContainer.innerHTML = `<p class="error">${error}Oh no! An error occurred when retrieving the jacket details. It will be fixed asap.</p>`;
    }
}

getJacketDetails();
