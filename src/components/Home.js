import React from 'react';
import AddItemsForm from './AddItemsForm';
import ItemsList from './ItemsList';

function Home() {
  return (
    <div className="home">
      <AddItemsForm />
      <ItemsList />
    </div>
  );
}

export default Home;
