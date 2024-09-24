import React from 'react'
import './Card.css'
import highPriorityIcon from './assets/Img - High Priority.svg'
import mediumPriorityIcon from './assets/Img - Medium Priority.svg'
import lowPriorityIcon from './assets/Img - Low Priority.svg'
import noPriorityIcon from './assets/No-priority.svg'
import doneIcon from './assets/Done.svg'
import inProgressIcon from './assets/in-progress.svg'
import todoIcon from './assets/To-do.svg'

// Function to get the appropriate priority icon
const getPriorityIcon = (priority) => {
	switch (priority) {
		case 4:
			return highPriorityIcon
		case 3:
			return mediumPriorityIcon
		case 2:
			return lowPriorityIcon
		case 1:
			return lowPriorityIcon
		default:
			return noPriorityIcon
	}
}

// Function to get the appropriate status icon
const getStatusIcon = (status) => {
	switch (status) {
		case 'Done':
			return doneIcon
		case 'In Progress':
			return inProgressIcon
		case 'Todo':
		default:
			return todoIcon
	}
}

const Card = ({ task }) => {
	const { title, id, tag, userId, status, priority } = task

	return (
		<div className="kanban-card">
			<div className="card-header">
				<h3>{title}</h3>
			</div>

			<div className="card-body">
				<div className="priority-icon">
					<img src={getPriorityIcon(priority)} alt="Priority" />
				</div>
				<span className="tag">{tag && tag.length > 0 ? tag[0] : 'No Tag'}</span>
				<span className="user-id">User: {userId}</span>
			</div>
		</div>
	)
}

export default Card
