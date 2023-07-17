import selectors from '../Pages/mainPage';

describe('adding products to cart', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.checkAndOpenCart();
  });

  it('add products to the cart', () => {
    // Retrieve the list of product names
    cy.getProductNames().then((productNames) => {
      // Iterate through each product name
      productNames.forEach((productName) => {
        // Add the product to the cart
        cy.addProductToCart(productName);
        // Verify that the product name is displayed in the cart
        cy.get(selectors.cartContent).should('contain', productName);
      });
    });
  });
});
