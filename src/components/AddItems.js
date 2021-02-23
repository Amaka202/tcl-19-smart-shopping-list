import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import Nav from './Nav';
import ItemListButton from './ItemListButton';
import { ReactComponent as HomeIcon } from '../img/home-solid.svg';

const db = firebase.firestore().collection('shopping_list');

const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const AddItemsToList = () => {
  const userToken = localStorage.getItem('token');
  const [shoppingListItemName, setShoppingListItemName] = useState('');
  const [daysLeftForNextPurchase, setDaysLeftForNextPurchase] = useState(7);
  const [shoppingListItemNameExists, setShoppingListItemNameExists] = useState(
    false,
  );

  const [shoppingList, loading, error] = useCollectionData(
    db.where('token', '==', userToken),
    { idField: 'documentId' },
  );

  const shoppingListItemNameHandler = (event) => {
    setShoppingListItemName(event.target.value);
    if (shoppingListItemNameExists === true) {
      setShoppingListItemNameExists(false);
    }
  };
  const daysLeftForNextPurchaseHandler = (event) => {
    setDaysLeftForNextPurchase(parseInt(event.target.value));
  };

  const normalizeString = (str) => {
    const nonWordCharactersAndUnderscores = /[\W_]/g;
    return str.toLowerCase().replace(nonWordCharactersAndUnderscores, '');
  };

  function submitShoppingListItemHandler(event) {
    event.preventDefault();

    if (shoppingListItemName === '') {
      alert('Please add an item');
      return;
    }
    const item = {
      shoppingListItemName,
      daysLeftForNextPurchase,
      lastPurchasedOn: null,
      numberOfPurchases: 0,
    };

    if (shoppingList.length) {
      const { documentId, items } = shoppingList[0];
      const shoppingListItemExists = items.some((shoppingListItemObject) => {
        return (
          normalizeString(shoppingListItemObject.shoppingListItemName) ===
          normalizeString(shoppingListItemName)
        );
      });
      if (shoppingListItemExists) {
        setShoppingListItemNameExists(true);
        return;
      }

      db.doc(documentId)
        .update({
          items: arrayUnion(item),
        })
        .then(() => alert('successfully added'))
        .catch((e) => console.log('error', e));
    } else {
      db.add({
        token: userToken,
        items: [item],
      })
        .then(() => {
          alert('successfully added');
        })
        .catch((e) => console.log('error', e));
    }
    setShoppingListItemName('');
    setDaysLeftForNextPurchase(7);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <div>
      <header className="max-h-screen flex flex-col box-border items-center">
        <section className="bg-green-700 w-full fixed text-center">
          <h2 className="pt-6 pb-16 text-4xl font-thin text-gray-100">
            Add Item to List
          </h2>
          <span className="text-white top-0 right-0 absolute sm:mt-4 sm:mr-4">
            <HomeIcon />
          </span>
        </section>
      </header>
      <main className="bg-white relative w-full h-full mt-24 rounded-t-3xl overflow-auto flex justify-center">
        <section className=" text-black md:mt-40 lg:w-1/3 mt-20">
          <form onSubmit={submitShoppingListItemHandler}>
            {shoppingListItemNameExists ? (
              <p>
                {`You have ${normalizeString(
                  shoppingListItemName,
                )} in your shopping list already`}
              </p>
            ) : null}
            <section className="flex justify-center">
              <input
                aria-label="Add an item input"
                type="text"
                placeholder="Add Item..."
                value={shoppingListItemName}
                onChange={shoppingListItemNameHandler}
                className="border text-gray-900 md:w-2/3 px-2 py-2 md:px-4 md:py-3 mb-8 rounded focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none focus:bg-green-100 text-center"
              />
            </section>
            <p className="text-center md:mb-8 mb-4">
              How soon are you likely to buy it again?
            </p>
            <section className="flex flex-col sm:flex-row sm:space-x-4 text-black md:mb-8 mb-4">
              <section className="xl:w-1/3 mb-4">
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="7"
                    checked={daysLeftForNextPurchase === 7}
                    onChange={daysLeftForNextPurchaseHandler}
                    className="mr-4"
                  />
                  Soon
                </label>
              </section>
              <section className="xl:w-1/3 mb-4">
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="14"
                    checked={daysLeftForNextPurchase === 14}
                    onChange={daysLeftForNextPurchaseHandler}
                    className="mr-4"
                  />
                  Kind of soon
                </label>
              </section>
              <section className="xl:w-1/3 mb-4">
                <label>
                  <input
                    type="radio"
                    name="next_purchase"
                    value="30"
                    checked={daysLeftForNextPurchase === 30}
                    onChange={daysLeftForNextPurchaseHandler}
                    className="mr-4"
                  />
                  Not soon
                </label>
              </section>
            </section>
            <section className="text-center mt-8">
              <button
                className="border py-2 px-3 hover:shadow-hover justify-center rounded-md bg-white text-black shadow-bottom w-32 mb-4 md:w-60 mb-4"
                type="submit"
              >
                Add Item
              </button>
            </section>
          </form>
        </section>

        <Nav />
        <ItemListButton />
      </main>
    </div>
  );
};

export default AddItemsToList;
