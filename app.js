/**
 * Fetch and load components into specified element IDs.
 *
 * @param {Array} components - An array of component objects with 'name' and 'elementId' properties.
 * @returns {void}
 */
const fetchComponents = (components) => {
    components.forEach((component) => {
      const { name, elementId } = component;
      fetch(`components/${name}.html`)
        .then((response) => response.text())
        .then((data) => {
          const element = document.getElementById(elementId);
          if (element) {
            element.innerHTML = data;
          }
        });
    });
  };


/**
 * Extracts the value of the 'product' URL parameter from the current window's URL.
 *
 * @returns {string} The value of the 'product' URL parameter if found.
 */
const getProductFromURL = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('product');
}


/**
 * Fetches the product from the JSON file, according to the URL parameter.
 *
 * @returns {void}
 */
const fetchProduct = () => {
  return {
      productFound: null,
      urlSlug: null,
      products: {},
      product: {},
      loadData() {
          fetch('products.json') // Sample API endpoint
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(json => {
                  this.urlSlug = getProductFromURL();
                  this.products = json;
                  this.product = json.find(product => product.slug === this.urlSlug);
                  if (this.product) {
                    this.productFound = true;
                  } else {
                    this.productFound = false;
                  }
              })
              .catch(error => {
                  console.error('There has been a problem with your fetch operation:', error);
                  this.loading = false;
              });
      }
  };
}

/**
 * Fetches all the products from the JSON file.
 *
 * @returns {void}
 */
const fetchProducts = () => {
  return {
      urlSlug: null,
      products: {},
      loadData() {
          fetch('products.json') // Sample API endpoint
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(json => {
                  this.products = json;
                  this.loading = false;
              })
              .catch(error => {
                  console.error('There has been a problem with your fetch operation:', error);
                  this.loading = false;
              });
      }
  };
}