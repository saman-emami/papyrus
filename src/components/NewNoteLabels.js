import React, { useState, useEffect } from 'react'
import icons from '../styles/icons'

export default function NewNoteLabels(props) {
	const [noteLabels, setNoteLabels] = [props.noteLabels, props.setNoteLabels]
	const [isNewNotePaletteVisible, setIsNewNotePaletteVisible] = useState(false)
	let labelsElements = props.labelsArray.map((item, index) =>
		index === 1 ? (
			<li
				key={index}
				className={
					noteLabels.includes(item)
						? 'note-label toolbar-icon selected'
						: 'toolbar-icon note-label'
				}
				onClick={() => selectLabel(item)}
			>
				{icons.archive}
			</li>
		) : (
			<li
				key={index}
				className={noteLabels.includes(item) ? 'note-label selected' : 'note-label'}
				onClick={() => selectLabel(item)}
			>
				{item}
			</li>
		)
	)
	labelsElements.splice(0, 1)

	function selectLabel(label) {
		if (noteLabels.includes(label)) {
			setNoteLabels((prevNoteLabels) =>
				prevNoteLabels.filter((item) => item !== label)
			)
		} else {
			setNoteLabels((prevNoteLabels) => {
				return [...prevNoteLabels, label]
			})
		}
	}

	useEffect(() => {
		props.handleLabels(noteLabels)
	}, [noteLabels])

	function createNewLabel() {
		const newLabelElement = document.getElementById('newLabel')
		if (
			newLabelElement.value !== '' &&
			!props.labelsArray.includes(newLabelElement.value)
		) {
			const newLabel = newLabelElement.value
			localStorage.setItem(
				'labelsArray',
				JSON.stringify([...props.labelsArray, newLabel])
			)
			props.setLabelsArray((prevLabelsArray) => {
				return [...prevLabelsArray, newLabel]
			})
			newLabelElement.value = ''
		}
	}

	function toggleColorPalette() {
		setIsNewNotePaletteVisible((prev) => !prev)
	}

	function setNoteColor(event) {
		props.setNewNote((prev) => {
			return {
				...prev,
				bgColor: event.target.id,
			}
		})
	}

	function enterKeyDown(event) {
		if (event.key === 'Enter') {
			createNewLabel()
		}
	}

	return (
		<div className='labels-container'>
			<span className='toolbar-icon' onClick={toggleColorPalette}>
				{icons.color}
			</span>

			{isNewNotePaletteVisible === true && (
				<>
					<div id='default' className='note-colors' onClick={setNoteColor}></div>
					<div id='red' className='note-colors' onClick={setNoteColor}></div>
					<div id='green' className='note-colors' onClick={setNoteColor}></div>
					<div id='blue' className='note-colors' onClick={setNoteColor}></div>
					<div id='yellow' className='note-colors' onClick={setNoteColor}></div>
					<div id='pink' className='note-colors' onClick={setNoteColor}></div>
				</>
			)}
			{labelsElements}
			<input
				placeholder='New Label'
				id='newLabel'
				name='newLabel'
				type='text'
				onKeyDown={enterKeyDown}
				onBlur={createNewLabel}
			/>
		</div>
	)
}
