import React, { useEffect, useState } from 'react'
import Card from './Card'
import './KanBan.css'

const App = () => {
	const [tasks, setTasks] = useState([])
	const [groupBy, setGroupBy] = useState('status') // default grouping by status
	const [sortBy, setSortBy] = useState('priority') // default sorting by priority
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Fetch tasks from API (replace with the correct endpoint)
		fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
			.then((response) => response.json())
			.then((data) => {
				setTasks(data.tickets)
				setLoading(false)
			})
			.catch((error) => console.error('Error fetching data:', error))
	}, [])

	// Group tasks based on the selected option (status, user, priority)
	const getGroupedTasks = () => {
		const grouped = {}

		if (groupBy === 'status') {
			tasks.forEach((task) => {
				if (!grouped[task.status]) grouped[task.status] = []
				grouped[task.status].push(task)
			})
		} else if (groupBy === 'user') {
			tasks.forEach((task) => {
				const user = task.assignedUser || 'Unassigned'
				if (!grouped[user]) grouped[user] = []
				grouped[user].push(task)
			})
		} else if (groupBy === 'priority') {
			tasks.forEach((task) => {
				const priorityLabel = getPriorityLabel(task.priority)
				if (!grouped[priorityLabel]) grouped[priorityLabel] = []
				grouped[priorityLabel].push(task)
			})
		}

		return grouped
	}

	// Sort tasks by priority or title
	const getSortedTasks = (group) => {
		return [...group].sort((a, b) => {
			if (sortBy === 'priority') {
				return b.priority - a.priority // descending order for priority
			} else {
				return a.title.localeCompare(b.title) // ascending order for title
			}
		})
	}

	// Convert priority number to readable string
	const getPriorityLabel = (priority) => {
		switch (priority) {
			case 4:
				return 'Urgent'
			case 3:
				return 'High'
			case 2:
				return 'Medium'
			case 1:
				return 'Low'
			default:
				return 'No Priority'
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	const groupedTasks = getGroupedTasks()

	return (
		<div className="kanban-board">
			<div className="controls">
				<label htmlFor="groupBy">Group By:</label>
				<select
					id="groupBy"
					value={groupBy}
					onChange={(e) => setGroupBy(e.target.value)}>
					<option value="status">Status</option>
					<option value="user">User</option>
					<option value="priority">Priority</option>
				</select>

				<label htmlFor="sortBy">Sort By:</label>
				<select
					id="sortBy"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}>
					<option value="priority">Priority</option>
					<option value="title">Title</option>
				</select>
			</div>

			<div className="columns">
				{Object.keys(groupedTasks).map((group, index) => (
					<div key={index} className="column">
						<h3>{group}</h3>
						{getSortedTasks(groupedTasks[group]).map((task) => (
							<Card key={task.id} task={task} />
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default App
