import React from 'react'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false
      },
      editing: false,
    }
    this.fetchTodos = this.fetchTodos.bind(this)
  }

  componentWillMount() {
    this.fetchTodos()
  }

  fetchTodos() {
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/todo-item-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList: data,
      })
      )
  }

  render() {
    var todos = this.state.todoList
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
            {todos.map(function(todo, index){
              return(
                <div key={index} className="todo-wrapper">
                  <span>{todo.content}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
