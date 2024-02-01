import React, { useEffect, useState, useRef } from 'react'
import NewNoteLabels from './NewNoteLabels'
import icons from '../styles/icons'

export default function NewNote(props) {
	const [noteLabels, setNoteLabels] = useState(['All'])
	const [titleInputIsActive, setTitleInputIsActive] = useState(false)
	const noteEditor = useRef(null)
	const [newNote, setNewNote] = useState({
		title: '',
		textInput: '',
		bgColor: 'default',
		isPinned: false,
		labels: ['All'],
		creationTime: 0,
		lastEditTime: 0,
	})

	function handleChange(event) {
		const { name, value } = event.target
		if (name === 'textInput') {
			props.autoSize(event)
		}
		setNewNote((prevNewNote) => {
			return {
				...prevNewNote,
				[name]: value,
			}
		})
	}

	useEffect(() => {
		const newNoteStyle = document.getElementById('new-note').style
		switch (newNote.bgColor) {
			case 'red':
				newNoteStyle.setProperty('background-color', 'rgb(255, 172, 172)')
				break
			case 'green':
				newNoteStyle.setProperty('background-color', 'rgb(164, 228, 156)')
				break
			case 'blue':
				newNoteStyle.setProperty('background-color', 'rgb(172, 205, 255)')
				break
			case 'yellow':
				newNoteStyle.setProperty('background-color', 'rgb(255, 254, 198)')
				break
			case 'pink':
				newNoteStyle.setProperty('background-color', 'rgb(255, 209, 232)')
				break
			default:
				newNoteStyle.setProperty('background-color', 'hsl(36, 15%, 88%)')
		}
	})

	function handleLabels(noteLabels) {
		setNewNote((prevNewNote) => {
			return {
				...prevNewNote,
				labels: noteLabels,
			}
		})
	}

	function createNote() {
		if (newNote.title !== '' || newNote.textInput !== '') {
			props.handleAddNote(newNote)
			setNoteLabels(['All'])
			setNewNote({
				title: '',
				textInput: '',
				bgColor: 'default',
				isPinned: false,
				labels: ['All'],
				creationTime: 0,
				lastEditTime: 0,
			})
			setTitleInputIsActive(false)
		} else {
			setNewNote((prevNewNote) => {
				return {
					...prevNewNote,
					isPinned: false,
					bgColor: 'default',
				}
			})
			setTitleInputIsActive(false)
		}
	}

	useEffect(() => document.addEventListener('click', toggleInputActive), [])

	function toggleInputActive(event) {
		const titleInput = document.querySelector('.note-title-input')
		if (noteEditor?.current.contains(event.target)) {
			titleInput.setAttribute('placeholder', 'Title')
			noteEditor.current.className = 'new-note-focused'
			setTitleInputIsActive(true)
		} else {
			titleInput.setAttribute('placeholder', 'Take a note...')
			noteEditor.current.className = 'new-note'
			setNoteLabels(['All'])
			setTitleInputIsActive(false)
		}
	}

	useEffect(() => {
		if (titleInputIsActive === false) {
			createNote()
		}
	}, [titleInputIsActive])

	useEffect(() => {
		if (titleInputIsActive === true && !noteLabels.includes(props.labelFilter)) {
			setNoteLabels((prevNoteLabels) => {
				return [...prevNoteLabels, props.labelFilter]
			})
		}
	}, [titleInputIsActive])

	function togglePin() {
		setNewNote((prevNewNote) => {
			return {
				...prevNewNote,
				isPinned: !prevNewNote.isPinned,
			}
		})
	}

	return (
		<div className='new-note-container'>
			<div ref={noteEditor} className='new-note' id='new-note'>
				<div className='new-note-header'>
					<input
						placeholder='Take a note...'
						className='note-title-input'
						name='title'
						type='text'
						onChange={handleChange}
						value={newNote.title}
					/>
					{titleInputIsActive === true && (
						<span
							id='new-note-pin'
							className={newNote.isPinned ? 'pin pinned' : 'pin'}
							onClick={togglePin}
						>
							{newNote.isPinned ? icons.pinFill : icons.pinOutline}
						</span>
					)}
				</div>
				{titleInputIsActive === true && (
					<>
						<textarea
							placeholder='Type here'
							className='note-text-input'
							name='textInput'
							onChange={handleChange}
							value={newNote.textInput}
						></textarea>
						<NewNoteLabels
							newNote={newNote}
							setNewNote={setNewNote}
							noteLabels={noteLabels}
							setNoteLabels={setNoteLabels}
							labelsArray={props.labelsArray}
							setLabelsArray={props.setLabelsArray}
							handleLabels={handleLabels}
						/>
						<div className='save-container'>
							<button className='save-new-note' onClick={createNote}>
								Save
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
