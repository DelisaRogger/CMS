function callApi(containerId, apiUrl, startIdx, endIdx) {
    const container = document.querySelector(`.${containerId}`);
    const loader = document.getElementById("loader");

    async function fetchData() {
        try {
            loader.style.display = "block";

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.length > 0) {
                const selectedProducts = data.slice(startIdx, endIdx);

                selectedProducts.forEach(product => {
                    container.innerHTML += `
                        <div class="product-box">
                            <a href="jacket-specific.html?id=${product.id}">
                                <img class="product-img" src="${product.images[0].src}" alt="${product.name}" />
                                <h3>${product.name}</h3>
                                <p class="price">$${product.prices.price}</p>
                            </a>
                        </div>
                    `;
                });
            } else {
                container.innerHTML = "No products available";
            }

            loader.style.display = "none";
        } catch (error) {
            console.error("Error fetching API data:", error);
            container.innerHTML = "There seems to be a problem. Please try again later.";
            loader.style.display = "none";
        }
    }

    fetchData();
}

// Call the API for each section
callApi("water-sports", "https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products", 0, 3);
callApi("outdoor", "https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products", 3, 6);
callApi("climbing", "https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products", 6, 9);
