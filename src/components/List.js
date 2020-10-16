import React from 'react';
import '../css/components/main.css';
import { FirestoreCollection } from 'react-firestore';
import '../css/components/ItemsList.css';

export default function List() {
  return (
    <div>
      <br />
      <br />
      <h1>LIST OF ITEMS</h1>
      <FirestoreCollection
        path="items"
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
    </div>
  );
}
