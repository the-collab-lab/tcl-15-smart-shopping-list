import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import '../css/components/ItemsList.css';
import { getToken } from '../lib/TokenService';
import { fromMilleToHours } from '../lib/helper';
import { shoppingLists, getShoppingList } from '../lib/shoppingListsCollection';

export default function List() {
  const checkItem = (index, item) => {
    getShoppingList(getToken())
      .then((data) => {
        const items = data.docs[0].data().items;
        items[index] = {
          ...item,
          lastPurchased: Date.now(),
        };

        shoppingLists().doc(data.docs[0].id).update({
          items,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>LIST OF ITEMS</h1>
      <FirestoreCollection
        path="shoppingLists"
        filter={['token', '==', getToken()]}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {data[0] ? (
                <ul>
                  {data[0].items.map((item, index) => {
                    const checked = fromMilleToHours(item.lastPurchased) < 24;
                    return (
                      <li key={item.name} className="list-item">
                        {
                          <input
                            type="checkbox"
                            onChange={(e) => checkItem(index, item)}
                            disabled={checked}
                            checked={checked}
                          />
                        }
                        <div className="name">{item.name}</div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div>Your list is empty!!</div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
