import React, { useState } from 'react';
import { FirestoreDocument } from 'react-firestore';
import SortedList from './SortedList';
import { getToken } from '../lib/TokenService';
import AddButton from './AddButton';
import { filter as removePunctuation } from '../lib/helper';
import '../css/components/ItemsList.css';

export default function List() {
  const [searchTerm, setSearchTerm] = useState('');

  const getItemsKeys = (shoppingList, searchTerm) => {
    delete shoppingList.id;
    let itemsKeys = Object.keys(shoppingList);
    if (searchTerm) {
      return itemsKeys.filter((key) =>
        removePunctuation(shoppingList[key].name).includes(
          removePunctuation(searchTerm),
        ),
      );
    }
    return itemsKeys;
  };

  return (
    <div>
      <h1>List of Items</h1>
      <FirestoreDocument
        path={`shoppingLists/${getToken()}`}
        render={({ isLoading, data }) => {
          // When the data (shoppingList) is fetched, store all the keys in itemsKeys
          // If not, then itemsKeys will be an empty array
          let itemsKeys = data ? getItemsKeys(data, searchTerm) : [];
          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {itemsKeys.length || searchTerm ? (
                <>
                  <div className="search-term-wrapper">
                    <label
                      aria-label="Search Item"
                      htmlFor="search-item"
                    ></label>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search item"
                      id="search-item"
                    />

                    <button
                      onClick={() => setSearchTerm('')}
                      disabled={searchTerm ? false : true}
                      aria-label="Clear search term"
                    >
                      X
                    </button>
                  </div>
                  {itemsKeys.length === 0 ? (
                    <p className="search-no-items">No items found.</p>
                  ) : (
                    <SortedList data={data} itemsKeys={itemsKeys} />
                  )}
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
