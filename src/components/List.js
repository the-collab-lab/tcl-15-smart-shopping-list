import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import '../css/components/ItemsList.css';

export default function List() {
  return (
    <div>
      <br />
      <br />
      <h1>LIST OF ITEMS</h1>
      <FirestoreCollection
        path="shoppingLists"
        filter={['token', '==', 801]} // TODO => fetch the token from localSorage
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {
                // just making sure we have a shoppingList before mapping through its items
                data[0] ? (
                  <ul>
                    {data[0].items.map((item) => (
                      <li key={item.name} className="list-item">
                        <div className="name">{item.name}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>Your list is empty!!</div>
                )
              }
            </div>
          );
        }}
      />
    </div>
  );
}
