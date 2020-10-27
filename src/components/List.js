import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import ListItem from './ListItem';
import '../css/components/ItemsList.css';
import { getToken } from '../lib/TokenService';

export default function List() {
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
                  {data[0].items.map((item, index) => (
                    <ListItem
                      listItem={item}
                      index={index}
                      key={index}
                      listId={data[0].id}
                      items={data[0].items}
                    />
                  ))}
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
