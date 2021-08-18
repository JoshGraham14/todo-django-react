import axios from 'axios'
import React, { Component } from 'react'

class Todo extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = () => {
		const { id, onDelete } = this.props
		axios
			.delete(`http://127.0.0.1:8000/api/todo-delete/${id}/`)
			.then(() => {
				onDelete(id)
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
