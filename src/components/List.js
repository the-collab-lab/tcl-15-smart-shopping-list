import React from 'react';
import { FirestoreDocument } from 'react-firestore';
import ListItem from './ListItem';
import '../css/components/ItemsList.css';
import { getToken } from '../lib/TokenService';

export default function List() {
  return (
    <div>
      <h1>LIST OF ITEMS</h1>
      <FirestoreDocument
        path={`shoppingLists/${getToken()}`}
        render={({ isLoading, data }) => {
          const itemsKeys = data
            ? Object.keys(data).filter((key) => key !== 'id')
            : '';
          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {itemsKeys.length >= 1 ? (
                <ul>
                  {itemsKeys
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((key) => {
                      return (
                        <ListItem
                          listItem={data[key]}
                          key={key}
                          listId={data.id}
                          itemId={key}
                        />
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
