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
                        <div class="sample">
                            <a href="jacket-specific.html?id=${product.id}">
                                <img src="${product.image}" alt="${product.title}">
                                <h3>${product.title}</h3>
                                <p class="price">${product.price}</p>
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

callApi("sample", "https://api.noroff.dev/api/v1/rainy-days", 0, 3);
