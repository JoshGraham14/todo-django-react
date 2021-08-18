import React from 'react'
import './App.css'
import Todo from './components/Todo.js'
import TodoForm from './components/TodoForm.js'
import axios from 'axios'

class App extends React.Component {
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

	componentDidMount() {
		let newState = this.state

		axios.get('http://127.0.0.1:8000/api/todo-list/').then(response => {
			newState.todoItems = response.data
			this.setState(newState)
		})
	}

	handleRemoveTodo(id) {
		const updatedTodoItems = this.state.todoItems.filter(
			item => item.id !== id
		)
		this.setState({ todoItems: updatedTodoItems })
	}

	handleUpdateTodo(childContent, childId) {
		let newState = this.state
		newState.updateTodo = { content: childContent, id: childId }
		newState.formEdit = true
		this.setState(newState)
		this.todoFormElement.current.handleEdit(childContent, childId)
	}

	saveUpdateTodo(childContent, childId) {
		let newState = this.state
		newState.updateTodo.content = childContent
		newState.updateTodo.id = childId
		newState.formEdit = false
		this.setState(newState)
		this.componentDidMount()
	}

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
								onDelete={this.handleRemoveTodo}
								onUpdate={this.handleUpdateTodo}
							/>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default App
