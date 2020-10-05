import React from 'react';
import { FirestoreCollection } from 'react-firestore';

function ReturnItemsList() {
  return (
    <FirestoreCollection
      path="items"
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div className="m-auto">Loading</div>
        ) : (
          <div>
            <ul>
              {data
                .sort((a, b) => b.added_on - a.added_on)
                .map((item) => (
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

export default ReturnItemsList;
