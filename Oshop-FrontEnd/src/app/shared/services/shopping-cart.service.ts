import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product';
import { ShoppingCartItem } from '@shared/models/shopping-cart-item';
import { ShoppingCart } from '@shared/models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'api/shopping-carts/';
  private _currentCart: ShoppingCart = null;

  get currentCart() {
    return this._currentCart;
  }

  set currentCart(cart) {
    this._currentCart = new ShoppingCart(cart.id, cart.items);
  }

  constructor(private http: HttpClient) {}

  cartExists() {
    return localStorage.getItem('cartId');
  }

  async getCart(): Promise<any> {
    const cartId = localStorage.getItem('cartId');
    let cart = null;
    if (cartId) {
      cart = await this.getCartFromAPI(cartId);
    } else {
      cart = await this.createCart();
      localStorage.setItem('cartId', cart['id']);
    }

    this.currentCart = cart;
    return this.currentCart;
  }

  async addToCart(product: Product) {
    return await this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    return await this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cart = await this.getCart();
    this.currentCart = await this.clearShoppingCart(cart.id);
  }

  private async clearShoppingCart(cartId): Promise<any> {
    return await this.http.delete(this.url + cartId + '/clear').toPromise();
  }

  private async getShoppingCartItem(cartId: string, itemId: string): Promise<any> {
    return await this.http.get(this.url + cartId + '/items/' + itemId).toPromise();
  }

  private async createShoppingCartItem(cartId: string, cartItem): Promise<any> {
    return await this.http.post(this.url + cartId + '/items', cartItem).toPromise();
  }
  private async updateShoppingCartItem(
    cartId: string,
    productId: string,
    item: ShoppingCartItem
  ) {
    return await this.http.put(this.url + cartId + '/items/' + productId, item).toPromise();
  }

  private async deleteShoppingCartItem(cartId: string, productId: string): Promise<any> {
    return await this.http.delete(this.url + cartId + '/items/' + productId).toPromise();
  }

  private async createCart() {
    return await this.http.post(this.url, {}).toPromise();
  }

  private async getCartFromAPI(cartId) {
    return await this.http.get(this.url + cartId).toPromise();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cart = await this.getCart();
    const cartItem = await this.getShoppingCartItem(cart.id, product.id);

    if (cartItem) {
      if ( change == -1 && cartItem.quantity <= 1) {
        cart = await this.deleteShoppingCartItem(cart.id, product.id);
        this.currentCart = cart;
        return this.currentCart;
      } else {
        cartItem.quantity = cartItem.quantity + change;
        cart = await this.updateShoppingCartItem(cart.id, product.id, cartItem);
      }

    } else {
      cart = await this.createShoppingCartItem(cart.id, {quantity: 1, productId: product.id});
    }

    this.currentCart = cart;
    return this.currentCart;
  }

}