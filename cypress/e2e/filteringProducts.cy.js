import selectors, { getSizeCheckbox } from '../Pages/mainPage';

describe('filtering products by size', () => {
  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.fixture('products.json').as('productsData');
    cy.visit('/');
  });

  it('displays products with the selected size', () => {
    // Retrieve the products data from the fixture
    cy.get('@productsData').then((productsData) => {
      // Iterate through each available size
      availableSizes.forEach((selectedSize) => {
        // Filter the products based on the selected size
        const filteredProducts = productsData.data.products.filter((product) =>
          product.availableSizes.includes(selectedSize)
        );
        // Extract the names of the filtered products
        const filteredProductNames = filteredProducts.map(
          (product) => product.title
        );

        // Click on the checkbox corresponding to the selected size
        cy.get(getSizeCheckbox(selectedSize)).click({ force: true });

        // Verify that each filtered product is displayed on the page
        filteredProductNames.forEach((productName) => {
          cy.get(selectors.productConatiner)
            .contains(selectors.productTitle, productName)
            .should('be.visible');
        });

        // Clear the filter for the next iteration
        cy.get(getSizeCheckbox(selectedSize)).click({ force: true });
      });
    });
  });
});
