import React from 'react';
import './App.css';
import Todo from './components/Todo.js';
import axios from 'axios';

// const todoItems = [
// 	{
// 		id: 1,
// 		content: 'This is a todo item',
// 		completed: false,
// 	},
// 	{
// 		id: 2,
// 		content: 'These todo items will eventually be pulled from the backend',
// 		completed: false,
// 	},
// 	{
// 		id: 3,
// 		content: 'This should be enough items for basic testing',
// 		completed: false,
// 	},
// ];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoItems: [],
		};
	}

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/todo-item-list/').then((response) => {
			this.setState({
				todoItems: response.data,
			});
			console.log(response.data);
		});
	}

	render() {
		return (
			<>
				<h1 style={{ textAlign: 'center', color: 'white' }}>
					Django - React: Todo List
				</h1>

				<div className='container'>
					<form id='form-wrapper'>
						<div className='flex-wrapper'>
							<input
								className='form-control'
								id='title'
								type='text'
								name='title'
								placeholder='Add todo item'
							/>
							<input
								id='submit'
								className='btn submit-btn'
								type='submit'
								name='add'
							/>
						</div>
					</form>
					<div className='todo-item-list'>
						{this.state.todoItems.map((item) => (
							<Todo key={item.id} name={item.content} />
						))}
					</div>
				</div>
			</>
		);
	}
}

export default App;
