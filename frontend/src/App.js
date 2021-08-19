import React from 'react'
import './App.css'
import Todo from './components/Todo.js'
import TodoForm from './components/TodoForm.js'
import axios from 'axios'

class App extends React.Component {
	/**
	 * Creates the root component.
	 * @constructor
	 * @param {*} props
	 */
	constructor(props) {
		super(props)
		this.state = {
			todoItems: [],
			updateTodo: {},
			formEdit: false,
		}

		this.todoFormElement = React.createRef()

		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
		this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
		this.saveUpdateTodo = this.saveUpdateTodo.bind(this)
	}

	/**
	 * Makes GET request to retrieve all items in the todo list and adds them
	 * to the state.
	 * */
	componentDidMount() {
		let newState = this.state

		axios.get('http://127.0.0.1:8000/api/todo-list/').then(response => {
			newState.todoItems = response.data
			this.setState(newState)
		})
	}

	/**
	 * Deletes a todo item from the database and sets the state to reflect the
	 * change on the frontend. This method gets passed to the Todo component
	 * as a prop and is called onClick.
	 * @param {string} id - The id of the item being deleted.
	 * */
	handleRemoveTodo(id) {
		const updatedTodoItems = this.state.todoItems.filter(
			item => item.id !== id
		)
		this.setState({ todoItems: updatedTodoItems })
	}

	/**
	 * This method will be called from a Todo component to transfer that
	 * component's state. That state is then transfered to the TodoForm
	 * comoponent by calling the handleEdit method, so that a Todo item
	 * can be updated.
	 * @param {string} childContent - Content of child Todo component.
	 * @param {number} childId - Id of child Todo component.
	 */
	handleUpdateTodo(childContent, childId) {
		let newState = this.state
		newState.updateTodo = { content: childContent, id: childId }
		newState.formEdit = true
		this.setState(newState)
		this.todoFormElement.current.handleEdit(childContent, childId)
	}

	/**
	 * This method is called onClick of the submit button in the TodoForm
	 * component when an item is being updated. The state is then set with
	 * the updated Todo component.
	 * @param {string} childContent - Content of child Todo component.
	 * @param {number} childId - Id of child Todo component.
	 */
	saveUpdateTodo(childContent, childId) {
		let newState = this.state
		newState.updateTodo.content = childContent
		newState.updateTodo.id = childId
		newState.formEdit = false
		this.setState(newState)
		this.componentDidMount()
	}

	/** Renders the root component. */
	render() {
		const { todoItems, updateTodo, formEdit } = this.state
		return (
			<>
				<h1 style={{ textAlign: 'center', color: 'white' }}>
					Django - React: Todo List
				</h1>

				<div className='container'>
					<TodoForm
						ref={this.todoFormElement}
						updateTodo={updateTodo}
						formEdit={formEdit}
						handleUpdateTodo={this.saveUpdateTodo}
						onCreate={this.componentDidMount}
					/>
					<div className='todo-item-list'>
						{todoItems.map(item => (
							<Todo
								key={item.id}
								content={item.content}
								id={item.id}
								completed={item.completed}
								onDelete={this.handleRemoveTodo}
								onUpdate={this.handleUpdateTodo}
								onCompleted={this.componentDidMount}
							/>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default App
