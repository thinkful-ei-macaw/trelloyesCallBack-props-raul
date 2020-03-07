import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';


function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

function newRandomCard(cardId) {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum'
  }

}

class App extends Component {
  state = {
    store: STORE
  }



  handleDeleteCard = (id) => {
    const newLists = this.state.store.lists.map(function (list) {
      return {
        ...list, cardIds: list.cardIds.filter(function (cardId) {
          return cardId !== id;
        })
      };
    })


    const allCards = omit(this.state.store.allCards, id);



    this.setState({
      store: {
        lists: newLists,
        allCards: allCards

      }
    })
  };


  addRandomCard = listId => {
    const myCard = newRandomCard();
    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, myCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [myCard.id]: myCard
        }
      }
    })
  };




  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              clickDeleteCard={this.handleDeleteCard}
              clickRandomCard={this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
