import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../lib/firebase';
import getToken from '../lib/tokens';
import welcome from '../img/welcome.png';

const db = firebase.firestore().collection('shopping_list');

const Home = () => {
  const [existingToken, setExistingToken] = useState('');
  const history = useHistory();

  const newList = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  const tokenHandler = (event) => {
    setExistingToken(event.target.value);
  };

  const [shoppingList] = useCollectionData(
    db.where('token', '==', existingToken),
  );

  const submitToken = (e) => {
    e.preventDefault();

    if (existingToken === '') {
      alert('Please enter a token...');
      return;
    }

    if (shoppingList.length) {
      localStorage.setItem('token', existingToken);
      history.push('/list');
    } else {
      alert('Token does not exist! Please try again or create a new list.');
      setExistingToken(' ');
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-300 to-blue-700 min-h-screen w-screen flex flex-col items-center justify-around text-center text-gray-100 text-lg font-light font-sans">
      <div className=" w-full pt-6 flex flex-col items-center">
        <h1 className="text-gray-900 font-normal text-3xl sm:text-4xl leading-loose">
          Welcome to <br />
          Smart Shopping App
        </h1>
        <img className="m-auto w-40 sm:w-56 mt-6" src={welcome} alt="symbol" />
      </div>
      <button
        type="submit"
        onClick={newList}
        className="home-btn hover:bg-blue-600"
      >
        Create List
      </button>
      <div>
        <p>- or -</p>
      </div>
      <div>
        <p>
          Join an existing list <br />
          by entering the three word token.
        </p>
      </div>
      <form onSubmit={submitToken} className="flex flex-col pb-4">
        <label htmlFor="token">Enter token</label>
        <input
          type="text"
          id="token"
          value={existingToken}
          onChange={tokenHandler}
          className="input my-2 py-2"
        />
        <button type="submit" className="home-btn mx-auto">
          Join list
        </button>
      </form>
    </div>
  );
};

export default Home;
