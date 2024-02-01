import React from 'react'
import icons from '../styles/icons'

export default function DeleteAlert(props) {
	return (
		<div className='delete-alert'>
			<div className='alert-icon'>{icons.delete}</div>
			<div className='delete-alert-message'>
				<div className='delete-alert-text'>
					Are you sure you want to delete this note?
				</div>
				<div className='options-container'>
					<p className='delete-note' onClick={props.deleteNote}>
						Delete
					</p>
					<div className='cancel-delete-note' onClick={props.toggleDeleteAlert}>
						Cancel
					</div>
				</div>
			</div>
		</div>
	)
}
