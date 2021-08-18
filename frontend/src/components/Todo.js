import axios from 'axios'
import React, { Component } from 'react'

class Todo extends Component {
	constructor(props) {
		super(props)
		this.handleClickDelete = this.handleClickDelete.bind(this)
		this.handleClickEdit = this.handleClickEdit.bind(this)
	}

	handleClickEdit = () => {
		const { content, id, onUpdate } = this.props
		onUpdate(content, id)
	}

	handleClickDelete = () => {
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
					<button
						onClick={this.handleClickEdit}
						className='btn edit-btn'
					>
						Edit
					</button>
					<button
						onClick={this.handleClickDelete}
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
