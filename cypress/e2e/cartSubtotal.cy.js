import selectors from '../Pages/mainPage';

describe('Product prices and subTotal on cart', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.checkAndOpenCart();
  });

  it('checking subTotal on cart', () => {
    let subTotal = 0;

    // Retrieve the list of product names
    cy.getProductNames().then((productNames) => {
      // Iterate through each product name
      productNames.forEach((productName) => {
        // Add the product to the cart
        cy.addProductToCart(productName);
        // Verify that the product name is displayed in the cart
        cy.get(selectors.cartContent).should('contain', productName);

        // Retrieve the price of the product
        cy.getProductPrice(productName).then((value) => {
          // Accumulate the product price to calculate the subtotal
          subTotal += value;
        });
      });
    });

    // Retrieve the subtotal displayed on the cart
    cy.getSubTotal().then((value) => {
      // Assert that the calculated subtotal matches the displayed subtotal
      expect(value).to.equal(subTotal);
    });
  });
});
