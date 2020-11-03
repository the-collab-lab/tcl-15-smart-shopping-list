import React, { useState } from 'react';
import { FirestoreDocument } from 'react-firestore';
import ListItem from './ListItem';
import '../css/components/ItemsList.css';
import { getToken } from '../lib/TokenService';
import AddButton from './AddButton';
import { filter as removePunctuation } from '../lib/helper';

export default function List() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1>LIST OF ITEMS</h1>
      <FirestoreDocument
        path={`shoppingLists/${getToken()}`}
        render={({ isLoading, data }) => {
          let itemsKeys;
          if (data) {
            delete data.id;
            itemsKeys = Object.keys(data);
            if (searchTerm) {
              itemsKeys = itemsKeys.filter((key) =>
                removePunctuation(data[key].name).includes(
                  removePunctuation(searchTerm),
                ),
              );
            }
          }

          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {itemsKeys.length >= 1 ? (
                <>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.trim())}
                  />{' '}
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')}>X</button>
                  )}
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
                </>
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
