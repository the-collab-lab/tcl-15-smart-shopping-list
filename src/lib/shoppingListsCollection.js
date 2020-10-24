import { db } from './firebase';

const shoppingLists = () => db.collection('shoppingLists');

let getShoppingList = (token) =>
  shoppingLists().where('token', '==', token).get();

export { shoppingLists, getShoppingList };
