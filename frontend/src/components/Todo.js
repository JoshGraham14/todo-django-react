import axios from 'axios'
import React, { Component } from 'react'

class Todo extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = e => {
		const { id } = this.props
		axios
			.delete(`http://127.0.0.1:8000/api/todo-item-delete/${id}/`)
			.then(() => {
				this.setState({ status: 'delete successful' })
				console.log('deleted item')
			})
	}

	render() {
		const { content } = this.props
		return (
			<div className='todo-item'>
				<h3>{content}</h3>
				<div className='todo-btns'>
					<button className='btn edit-btn'>Edit</button>
					<button
						onClick={this.handleClick}
						className='btn delete-btn'
					>
						Delete
					</button>
				</div>
			</div>
		)
	}
}

export default Todo

// function Todo(props) {
// 	function handleClick(e) {
// 		console.log('clicked delete button')
// 	}

// 	return (
// 		<div className='todo-item'>
// 			<h3>{props.name}</h3>
// 			<div className='todo-btns'>
// 				<button className='btn edit-btn'>Edit</button>
// 				<button onClick={handleClick} className='btn delete-btn'>
// 					Delete
// 				</button>
// 			</div>
// 		</div>
// 	)
// }
