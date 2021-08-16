function Todo(props) {
	return (
		<div className='todo-item'>
			<h3>{props.name}</h3>
			<div className='todo-btns'>
				<button className='btn edit-btn'>Edit</button>
				<button className='btn delete-btn'>Delete</button>
			</div>
		</div>
	);
}

export default Todo;
