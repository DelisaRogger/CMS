const apiUrl = 'https://api.noroff.dev/api/v1/rainy-days/';

// Fetch product data from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const productListContainer = document.getElementById('productList');

    // Create product elements dynamically based on API data
    data.slice(0, 12).forEach(product => {
      const productBox = document.createElement('div');
      productBox.classList.add('product-box');

      const productLink = document.createElement('a');
      productLink.href = `jacket-specific.html?id=${product.id}`;

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const productName = document.createElement('h3');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price}`;

      productLink.appendChild(productImage);
      productLink.appendChild(productName);
      productLink.appendChild(productPrice);

      productBox.appendChild(productLink);
      productListContainer.appendChild(productBox);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
