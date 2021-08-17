import React, { Component } from 'react'
import axios from 'axios'

class TodoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			content: '',
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange = e => {
		this.setState({
			content: e.target.value,
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		axios
			.post('http://127.0.0.1:8000/api/todo-item-create/', this.state)
			.then(response => {
				// console.log(response)
				this.setState({ content: '' })
			})
	}

	render() {
		const { content } = this.state
		return (
			<form onSubmit={this.handleSubmit} id='form-wrapper'>
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
