import React, { Component } from 'react'
import axios from 'axios'

class TodoForm extends Component {
	/** Creates a TodoForm component. */
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

	/**
	 * Sets the state with the props of the Todo item being edited.
	 * @param {string} parentContent - Content of item being edited.
	 * @param {number} parentId - Id of item being edited.
	 */
	handleEdit = (parentContent, parentId) => {
		this.setState({
			content: parentContent,
			id: parentId,
		})
	}

	/**
	 * Makes PUT request to API to update a Todo item. Sets the state of
	 * the form input to be empty after the update is made. This method
	 * is only called onClick of the submit button is props.formEdit is
	 * true.
	 * @param {*} e - event when submitted button is clicked.
	 */
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

	/**
	 * Sets changes to form input field to state.
	 * @param {*} e - event when content of input field is changed.
	 */
	handleChange = e => {
		this.setState({
			content: e.target.value,
		})
	}

	/**
	 * Makes a POST call to the API to submit a new Todo item. Calls the
	 * componentDidMount method with the onCreate prop from the App
	 * component, to update the state of the App component.
	 * @param {*} e - event when submit button is clicked.
	 */
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

	/** Renders the TodoForm component. */
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
						value={formEdit ? 'Update' : 'Submit'}
					/>
				</div>
			</form>
		)
	}
}

export default TodoForm
