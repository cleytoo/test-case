import { calculateDiscount } from './discount.utils';
import { find, remove } from 'lodash';
import Money from 'dinero.js';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });
      const discount = condition
        ? calculateDiscount(amount, quantity, condition)
        : Money({ amount: 0 });

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  sumarry() {
    return {
      total: this.getTotal().getAmount(),
      formatted: this.getTotal().toFormat('$0,0.00'),
      items: this.items,
    };
  }

  checkout() {
    const cart = this.sumarry();

    this.items = [];

    return cart;
  }
}
