import React, { useRef } from 'react'
import icons from '../styles/icons'

export default function NoteCard(props) {
	const { title, textInput, bgColor, isPinned, labels } = props.notesArray[props.index]
	const pinNode = useRef(null)
	const cardLabels = labels.map((item, index) => (
		<li key={index} className='card-label'>
			{item}
		</li>
	))
	cardLabels.splice(0, 1)

	function toggleCardPin() {
		localStorage.setItem(
			'notesArray',
			JSON.stringify(
				props.notesArray.map((item, index) =>
					index === props.index ? { ...item, isPinned: !isPinned } : item
				)
			)
		)
		props.setNotesArray((prevNotesArray) =>
			prevNotesArray.map((item, index) =>
				index === props.index ? { ...item, isPinned: !isPinned } : item
			)
		)
	}

	return (
		<section
			className={'note-card ' + bgColor}
			onClick={(event) =>
				!pinNode.current.contains(event.target)
					? props.toggleEditor(props.index)
					: toggleCardPin()
			}
		>
			<div className='note-card-header'>
				<h2 className='note-title'>{title}</h2>
				<span ref={pinNode} className={isPinned ? 'pin pinned' : 'pin'}>
					{isPinned ? icons.pinFill : icons.pinOutline}
				</span>
			</div>
			<p className='note-summery'>
				{textInput.length <= 500 ? textInput : textInput.slice(0, 500) + '...'}
			</p>
			{labels.length >= 2 && <div className='card-labels-container'>{cardLabels}</div>}
		</section>
	)
}
