
function callApi(containerId, apiUrl, startIdx, endIdx) {
    const container = document.getElementById(containerId);
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
                                <img class="product-img" src="${product.image}" alt="${product.title}" />
                                <h3>${product.title}</h3>
                                <p class="price">$${product.price}</p>
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
            container.innerHTML = "Error fetching data";
            loader.style.display = "none";
        }
    }

    fetchData();
}

callApi("outdoor-container", "https://api.noroff.dev/api/v1/rainy-days", 0, 3);
callApi("hiking-container", "https://api.noroff.dev/api/v1/rainy-days", 3, 6);
callApi("climbing-container", "https://api.noroff.dev/api/v1/rainy-days", 6, 9);
callApi("water-sports-container", "https://api.noroff.dev/api/v1/rainy-days", 9, 12);
