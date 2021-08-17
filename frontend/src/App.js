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
	}

	componentDidMount() {
		axios
			.get('http://127.0.0.1:8000/api/todo-item-list/')
			.then(response => {
				this.setState({
					todoItems: response.data,
				})
				console.log(response.data)
			})
	}

	render() {
		const { todoItems } = this.state
		return (
			<>
				<h1 style={{ textAlign: 'center', color: 'white' }}>
					Django - React: Todo List
				</h1>

				<div className='container'>
					<TodoForm />
					<div className='todo-item-list'>
						{todoItems.map(item => (
							<Todo
								key={item.id}
								content={item.content}
								id={item.id}
							/>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default App
