import React from 'react'
import icons from '../styles/icons'

export default function EditLabels(props) {
	const [newLabelInput, setNewLabelInput] = [props.newLabelInput, props.setNewLabelInput]

	function openLabelEditor() {
		if (props.editingLabels === false) {
			props.setEditingLabels((prev) => !prev)
			props.labelEditorContainer.current.classList.toggle('open')
			props.setLabelFilter('')
		}
	}

	function closeLabelEditor() {
		if (props.editingLabels === true) {
			props.setEditingLabels((prev) => !prev)
			props.labelEditorContainer.current.classList.toggle('open')
			props.setLabelFilter('All')
		}
	}

	function newLabelChange(event) {
		setNewLabelInput(event.target.value)
	}

	return (
		<div
			ref={props.labelEditorContainer}
			className='label-editor-container'
			onClick={openLabelEditor}
		>
			<div className='edit-label-button'>
				<span className='label-icon'>{icons.edit}</span>
				Edit Labels
			</div>
			{props.editingLabels === true && (
				<>
					<input
						id='new-label-sidebar'
						placeholder='New Label'
						className='sidebar-new-label'
						type='text'
						value={newLabelInput}
						onKeyDown={props.enterKeyDown}
						onBlur={props.newSidebarLabel}
						onChange={newLabelChange}
					/>
					<div
						id='finish-label-edit'
						className='finish-label-edit'
						onClick={closeLabelEditor}
					>
						{newLabelInput !== '' ? 'Add' : 'Finish'}
					</div>
				</>
			)}
		</div>
	)
}
