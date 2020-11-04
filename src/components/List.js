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
      <h1>LIST OF ITEMS</h1>
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
                  <div>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.trim())}
                      placeholder="Search item"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')}>X</button>
                    )}
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

const getItemsKeys = (data, searchTerm) => {
  delete data.id;
  let itemsKeys = Object.keys(data);
  if (searchTerm) {
    return itemsKeys.filter((key) =>
      removePunctuation(data[key].name).includes(removePunctuation(searchTerm)),
    );
  }
  return itemsKeys;
};
