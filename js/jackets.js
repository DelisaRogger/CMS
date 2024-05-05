function callApi(categories, apiUrl) {
    const loader = document.getElementById("loader");

    async function fetchData() {
        try {
            loader.style.display = "block";

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.length > 0) {
                categories.forEach(category => {
                    const container = document.querySelector(`.${category.containerId}`);
                    const selectedProducts = data.slice(category.startIdx, category.endIdx);

                    if (selectedProducts.length > 0) {
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
                });
            } else {
                categories.forEach(category => {
                    const container = document.querySelector(`.${category.containerId}`);
                    container.innerHTML = "No products available";
                });
            }

            loader.style.display = "none";
        } catch (error) {
            console.error("Error fetching API data:", error);
            categories.forEach(category => {
                const container = document.querySelector(`.${category.containerId}`);
                container.innerHTML = "There seems to be a problem loading the products. Please try again later.";
            });
            loader.style.display = "none";
        }
    }

    fetchData();
}

const apiUrl = "https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products";

const categories = [
    { containerId: "water-sports", startIdx: 0, endIdx: 3 },
    { containerId: "outdoor", startIdx: 3, endIdx: 6 },
    { containerId: "climbing", startIdx: 6, endIdx: 9 }
];

callApi(categories, apiUrl);
