import { db } from './firebase';
import { getToken } from './TokenService';

const shoppingLists = () => db.collection('shoppingLists');

let userShoppingList = (sharedToken) =>
  shoppingLists().doc(!sharedToken ? getToken() : sharedToken);

export { shoppingLists, userShoppingList };
