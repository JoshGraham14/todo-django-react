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
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
	}

	componentDidMount() {
		axios
			.get('http://127.0.0.1:8000/api/todo-item-list/')
			.then(response => {
				this.setState({
					todoItems: response.data,
				})
			})
	}

	handleRemoveTodo(id) {
		const updatedTodoItems = this.state.todoItems.filter(
			item => item.id !== id
		)
		this.setState({ todoItems: updatedTodoItems })
	}

	render() {
		const { todoItems } = this.state
		return (
			<>
				<h1 style={{ textAlign: 'center', color: 'white' }}>
					Django - React: Todo List
				</h1>

				<div className='container'>
					<TodoForm onCreate={this.componentDidMount} />
					<div className='todo-item-list'>
						{todoItems.map(item => (
							<Todo
								key={item.id}
								content={item.content}
								id={item.id}
								onDelete={this.handleRemoveTodo}
							/>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default App
