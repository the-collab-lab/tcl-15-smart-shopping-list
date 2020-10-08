import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import '../css/components/ItemsList.css';

function ItemsList() {
  return (
    <FirestoreCollection
      path="items"
      sort="added_on:desc"
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div className="m-auto">Loading</div>
        ) : (
          <div>
            <ul>
              {data.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="name">{item.name}</div>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export default ItemsList;
