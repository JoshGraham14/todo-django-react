import axios from 'axios'
import React, { Component } from 'react'

class Todo extends Component {
	/**
	 * Creates a Todo component.
	 * @param {*} props
	 */
	constructor(props) {
		super(props)
		this.handleClickDelete = this.handleClickDelete.bind(this)
		this.handleClickEdit = this.handleClickEdit.bind(this)
	}

	/**
	 * Called onClick of the edit button. calls the handleUpdateTodo method
	 * with the onUpdate prop from the App component.
	 */
	handleClickEdit = () => {
		const { content, id, onUpdate } = this.props
		onUpdate(content, id)
	}

	/**
	 * Called onClick of the delete button. Makes a DELETE request to the API
	 * and calls the handleRemoveTodo method with the onDelete prop from the
	 * App component.
	 */
	handleClickDelete = () => {
		const { id, onDelete } = this.props
		axios
			.delete(`http://127.0.0.1:8000/api/todo-delete/${id}/`)
			.then(() => {
				onDelete(id)
			})
	}

	/** Renders the Todo component. */
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
