/// <reference types="cypress" />
import selectors from "../Pages/mainPage";

Cypress.Commands.add('checkAndOpenCart', () => {
  cy.get('body').then(($body) => {
    if (!$body.find(selectors.cartContent).is(':visible')) {
      cy.get(selectors.cartButton).click();
    }
  });
});

Cypress.Commands.add('getProductPrice', (productName) => {
  cy.get(`@product-${productName}`)
    .find(selectors.productVal)
    .invoke('text')
    .then((text) => {
      const regex = /\$\s?(\d+(\.\d{1,2})?)/;
      const match = regex.exec(text);
      const priceValue = match ? parseFloat(match[1]) : null;
      cy.log("Adding " + productName + " with price: " + priceValue);
      return cy.wrap(priceValue); // Wrap the value to make it accessible outside
    });
});

Cypress.Commands.add('getSubTotal', () => {
  cy.get(selectors.cartContent)
    .find(selectors.cartSubtotal)
    .invoke('text')
    .then((text) => {
      const regex = /\$\s?(\d+(\.\d{1,2})?)/;
      const match = regex.exec(text);
      const subTotal = match ? parseFloat(match[1]) : null;
      cy.log("Subtotal is " + subTotal);
      return cy.wrap(subTotal); // Wrap the value to make it accessible outside
    });
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(selectors.productTitle, productName)
    .parent(selectors.productContainer)
    .as(`product-${productName}`);

  cy.get(`@product-${productName}`)
    .find(selectors.buyButton)
    .click();
});

Cypress.Commands.add('getProductNames', () => {
  return cy.fixture('products.json').then((productsData) => {
    const productNames = productsData.data.products.slice(0, 4).map((product) => product.title);
    return productNames;
  });
});
