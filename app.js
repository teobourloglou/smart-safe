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
 * @returns {string|null} The value of the 'product' URL parameter if found, otherwise null.
 */
const getProductFromURL = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('product');
}

const fetchProduct = () => {
  return {
      loading: true,
      urlSlug: null,
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
                  this.product = json.find(product => product.slug === this.urlSlug);

                  this.loading = false;
              })
              .catch(error => {
                  console.error('There has been a problem with your fetch operation:', error);
                  this.loading = false;
              });
      }
  };
}