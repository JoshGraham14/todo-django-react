import React from 'react'
import './App.css';

class App extends React.Component {
  render() {

    return(
      <div className="container">
        <div id="todo-container">
          <form id="form-wrapper">
            <div className="flex-wrapper">
              <input className="form-control" id="title" type="text" name="title" placeholder="Add todo item" />
              <input id="submit" className="btn submit-btn" type="submit" name="add"/>
            </div>
          </form>
          <div id="list-wrapper">

          </div>
        </div>
      </div>
    )
  }
}

export default App;
