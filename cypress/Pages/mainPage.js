export const getSizeCheckbox = (selectedSize) =>
  `input[type="checkbox"][value="${selectedSize}"]`;

export default {
  productTitle: 'p[class^="Product__Title"]',
  productConatiner: 'div[class^="Product__Container"]',
  buyButton: 'button[class^="Product__BuyButton"]',
  cartContent: 'div[class^="Cart__CartContent"]',
  cartButton: 'button[class^="Cart__CartButton"]',
  cartSubtotal: 'p[class^="Cart__SubPriceValue"]',
  productVal: 'p[class^="Product__Val"]',
};
