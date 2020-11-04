import React, { useState } from 'react';
import { FirestoreDocument } from 'react-firestore';
import SortedList from './SortedList';
import { getToken } from '../lib/TokenService';
import AddButton from './AddButton';
import { filter as removePunctuation } from '../lib/helper';
import '../css/components/ItemsList.css';

export default function List() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h3>LIST OF ITEMS</h3>
      <FirestoreDocument
        path={`shoppingLists/${getToken()}`}
        render={({ isLoading, data }) => {
          let itemsKeys = data ? getItemsKeys(data, searchTerm) : [];
          return isLoading ? (
            <div className="m-auto">Loading</div>
          ) : (
            <div>
              {itemsKeys.length || searchTerm ? (
                <>
                  <div className="search-term-wrapper">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.trim())}
                      placeholder="Search item"
                    />
                    <button
                      onClick={() => setSearchTerm('')}
                      disabled={searchTerm ? false : true}
                    >
                      X
                    </button>
                  </div>
                  <SortedList data={data} itemsKeys={itemsKeys} />
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
