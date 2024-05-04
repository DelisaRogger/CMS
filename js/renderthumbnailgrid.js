async function populateGrid() {
    try {
        const response = await fetch("https://cors.noroff.dev/http://rainydelrog.no/rainydays/wp-json/wc/store/products/");
        const data = await response.json();

        const gridContainer = document.getElementById("grid-container");

        if (Array.isArray(data) && data.length >= 3) {
            data.slice(0, 3).forEach(item => {
                const { id, images, name, prices } = item;

                const thumbnail = document.createElement("div");
                thumbnail.classList.add("product");

                const anchor = document.createElement("a");
                anchor.href = `jacket-specific.html?id=${id}`;

                const img = document.createElement("img");
                img.src = images[0].src;
                img.alt = name;

                const titleElement = document.createElement("h3");
                titleElement.textContent = name;

                const priceElement = document.createElement("p");
                priceElement.classList.add("price");
                priceElement.textContent = `${prices.price}`;

                anchor.appendChild(img);
                anchor.appendChild(titleElement);
                anchor.appendChild(priceElement);

                thumbnail.appendChild(anchor);

                gridContainer.appendChild(thumbnail);
            });
        } else {
            console.error("Insufficient data from API");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

populateGrid();
