import React, { Component } from 'react'
import axios from 'axios'

class TodoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			content: '',
			id: null,
		}

		this.handleEdit = this.handleEdit.bind(this)
		this.makeEdit = this.makeEdit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleEdit = (parentContent, parentId) => {
		this.setState({
			content: parentContent,
			id: parentId,
		})
	}

	makeEdit = e => {
		e.preventDefault()
		const { content, id } = this.state
		const { handleUpdateTodo } = this.props
		axios
			.put(`http://127.0.0.1:8000/api/todo-update/${id}/`, {
				content: content,
			})
			.then(() => {
				handleUpdateTodo(content, id)
				this.setState({ content: '', id: 1 })
			})
	}

	handleChange = e => {
		this.setState({
			content: e.target.value,
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		const { onCreate } = this.props
		axios
			.post('http://127.0.0.1:8000/api/todo-create/', this.state)
			.then(response => {
				this.setState({ content: '' })
				onCreate()
			})
	}

	render() {
		const { content } = this.state
		const { formEdit } = this.props
		return (
			<form
				onSubmit={formEdit ? this.makeEdit : this.handleSubmit}
				id='form-wrapper'
			>
				<div className='flex-wrapper'>
					<input
						className='form-control'
						type='text'
						name='content'
						placeholder='Add todo item'
						value={content}
						onChange={this.handleChange}
					/>
					<input
						className='btn submit-btn'
						type='submit'
						name='add'
					/>
				</div>
			</form>
		)
	}
}

export default TodoForm
