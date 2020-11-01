import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import '../css/components/ItemsList.css';
import { getToken } from '../lib/TokenService';
import AddButton from './AddButton';

export default function List() {
  return (
    <div>
      <h1 className="app-name">Smart Shopping List</h1>
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
                  {data[0].items.map((item) => (
                    <li key={item.name} className="list-item">
                      <div className="name">{item.name}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <AddButton />
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
