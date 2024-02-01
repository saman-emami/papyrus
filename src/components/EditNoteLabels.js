import React, { useState } from 'react'
import icons from '../styles/icons'

export default function EditNoteLabels(props) {
	const [isEditNotePaletteVisible, setIsEditNotePaletteVisible] = useState(false)
	let labelsElements = props.labelsArray.map((item, index) =>
		props.editLabels.includes(item) ? (
			<li
				key={index}
				index={index}
				id={item}
				className='edit-note-label selected'
				onClick={() => toggleLabel(item)}
			>
				{index === 1 ? icons.archive : item}
			</li>
		) : (
			<li
				key={index}
				index={index}
				id={'editor' + item}
				className='edit-note-label'
				onClick={() => toggleLabel(item)}
			>
				{index === 1 ? icons.archive : item}
			</li>
		)
	)
	labelsElements.shift()

	function toggleLabel(label) {
		props.editLabels.includes(label)
			? props.setEditLabels((prevEditLabels) =>
					prevEditLabels.filter((item) => item !== label)
			  )
			: props.setEditLabels((prevEditLabels) => [...prevEditLabels, label])
	}

	function enterKeyDown(event) {
		if (event.key === 'Enter') {
			createNewLabel()
		}
	}

	function createNewLabel() {
		if (
			document.getElementById('editNewLabel').value !== '' &&
			!props.labelsArray.includes(document.getElementById('editNewLabel').value)
		) {
			const newLabel = document.getElementById('editNewLabel').value
			document.getElementById('editNewLabel').value = ''
			localStorage.setItem(
				'labelsArray',
				JSON.stringify([...props.labelsArray, newLabel])
			)
			props.setLabelsArray((prevLabelsArray) => {
				return [...prevLabelsArray, newLabel]
			})
		}
	}

	function toggleEditColorPalette() {
		setIsEditNotePaletteVisible((prev) => !prev)
	}

	return (
		<div className='edit-note-label-container'>
			<span className='toolbar-icon' onClick={toggleEditColorPalette}>
				{icons.color}
			</span>
			{isEditNotePaletteVisible === true && (
				<>
					<div
						id='e-default'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
					<div
						id='e-red'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
					<div
						id='e-green'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
					<div
						id='e-blue'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
					<div
						id='e-yellow'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
					<div
						id='e-pink'
						className='note-colors'
						onClick={props.changeNoteColor}
					></div>
				</>
			)}
			{labelsElements}
			<span
				id='delete-note-button'
				className='material-symbols-outlined toolbar-icon'
				onClick={props.toggleDeleteAlert}
			>
				{icons.delete}
			</span>
			<input
				placeholder='New Label'
				id='editNewLabel'
				name='editNewLabel'
				type='text'
				onKeyDown={enterKeyDown}
				onBlur={createNewLabel}
			/>
		</div>
	)
}
