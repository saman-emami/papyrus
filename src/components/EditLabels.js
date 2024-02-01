import React, { useEffect, useRef } from 'react'
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
			props.setEditingLabels(false)
			props.labelEditorContainer.current.classList.toggle('open')
			props.setLabelFilter('All')
		}
	}

	function closeLabelEditorOnClickOutside(event) {
		if (!props.labelEditorContainer.current.contains(event.target)) {
			closeLabelEditor()
			console.log('close')
		}
	}

	function newLabelChange(event) {
		setNewLabelInput(event.target.value)
	}

	useEffect(() => {
		document.addEventListener('click', closeLabelEditorOnClickOutside)
		return () => {
			document.removeEventListener('click', closeLabelEditorOnClickOutside)
		}
	}, [props.editingLabels])

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
