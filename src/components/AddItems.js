import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import Nav from './Nav';

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
      alert('Please enter item name...');
      return;
    }

    const item = {
      shoppingListItemName,
      daysLeftForNextPurchase,
      lastPurchasedOn: null,
    };

    if (shoppingList.length) {
      const { documentId, items } = shoppingList[0];
      const shoppingListItemExists = items.some(
            (shoppingListItemObject) => {
              return (
                normalizeString(shoppingListItemObject.shoppingListItemName) ===
                normalizeString(shoppingListItemName)
              );
            },
          );
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
      });
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
      <div>
        <form onSubmit={submitShoppingListItemHandler}>
          <h2>Add Item to List</h2>
          {shoppingListItemNameExists ? (
            <p>
              {`You have ${normalizeString(
                shoppingListItemName,
              )} in your shopping list already`}
            </p>
          ) : null}
          <div>
            <label>
              Name
              <input
                type="text"
                value={shoppingListItemName}
                onChange={shoppingListItemNameHandler}
              />
            </label>
          </div>
          <fieldset>
            How soon are you likely to buy it again?
            <div>
              <label>
                Soon
                <input
                  type="radio"
                  name="next_purchase"
                  value="7"
                  checked={daysLeftForNextPurchase === 7}
                  onChange={daysLeftForNextPurchaseHandler}
                />
              </label>
            </div>
            <div>
              <label>
                Kind of soon
                <input
                  type="radio"
                  name="next_purchase"
                  value="14"
                  checked={daysLeftForNextPurchase === 14}
                  onChange={daysLeftForNextPurchaseHandler}
                />
              </label>
            </div>
            <div>
              <label>
                Not soon
                <input
                  type="radio"
                  name="next_purchase"
                  value="30"
                  checked={daysLeftForNextPurchase === 30}
                  onChange={daysLeftForNextPurchaseHandler}
                />
              </label>
            </div>
          </fieldset>
          <button type="submit">Add Item</button>
        </form>
      </div>
      <Nav />
    </div>
  );
};

export default AddItemsToList;