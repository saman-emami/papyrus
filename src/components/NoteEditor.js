import React, { useEffect } from 'react'
import EditNoteLabels from './EditNoteLabels'
import DeleteAlert from './DeleteAlert'
import icons from '../styles/icons'

export default function NoteEditor(props) {
	const [editLabels, setEditLabels] = [props.editLabels, props.setEditLabels]
	const [notesArray, setNotesArray] = [props.notesArray, props.setNotesArray]
	const [deleteAlert, setDeleteAlert] = [props.deleteAlert, props.setDeleteAlert]
	const isEditing = props.isEditing
	const editingNote = notesArray[isEditing]
	const editingNoteBGColor = editingNote != null ? editingNote.bgColor : ''
	const editingNoteDate =
		editingNote != null
			? editingNote.lastEditTime === 0
				? editingNote.creationTime
				: editingNote.lastEditTime
			: ''
	const formatedDate =
		editingNote != null ? (
			<div className='note-editor-date'>
				{editingNote != null
					? editingNote.lastEditTime === 0
						? 'Created '
						: 'Edited '
					: ''}
				{editingNoteDate.getFullYear() +
					'/' +
					(editingNoteDate.getMonth() + 1) +
					'/' +
					editingNoteDate.getDate() +
					', ' +
					editingNoteDate.getHours() +
					':' +
					editingNoteDate.getMinutes()}
			</div>
		) : (
			''
		)

	function handleEdit(event) {
		const lastEditTime = new Date()
		const { name, value } = event.target
		localStorage.setItem(
			'notesArray',
			JSON.stringify(
				notesArray.map((item, Index) =>
					Index === isEditing
						? { ...item, [name]: value, lastEditTime: lastEditTime }
						: item
				)
			)
		)
		setNotesArray((prevNotesArray) => {
			return prevNotesArray.map((item, Index) =>
				Index === isEditing
					? { ...item, [name]: value, lastEditTime: lastEditTime }
					: item
			)
		})
	}

	useEffect(() => {
		if (isEditing !== 'none') {
			const EditorTextInput = document.querySelector('.note-editor-textinput')
			EditorTextInput.style.height = EditorTextInput.scrollHeight + 'px'
			updateEditorColor()
		}
	}, [isEditing])

	useEffect(() => {
		if (isEditing !== 'none') {
			updateEditorColor()
		}
	}, [editingNoteBGColor])

	function updateEditorColor() {
		const noteEditorStyle = document.querySelector('.note-editor').style
		switch (editingNote.bgColor) {
			case 'red':
				noteEditorStyle.setProperty('background-color', 'rgb(255, 172, 172)')
				break
			case 'green':
				noteEditorStyle.setProperty('background-color', 'rgb(164, 228, 156)')
				break
			case 'blue':
				noteEditorStyle.setProperty('background-color', 'rgb(172, 205, 255)')
				break
			case 'yellow':
				noteEditorStyle.setProperty('background-color', 'rgb(255, 254, 198)')
				break
			case 'pink':
				noteEditorStyle.setProperty('background-color', 'rgb(255, 209, 232)')
				break
			default:
				noteEditorStyle.setProperty('background-color', 'hsl(36, 15%, 88%)')
		}
	}

	function changeNoteColor(event) {
		switch (event.target.id) {
			case 'e-red':
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'red' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'red' } : item
					)
				})
				break
			case 'e-green':
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'green' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'green' } : item
					)
				})
				break
			case 'e-blue':
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'blue' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'blue' } : item
					)
				})
				break
			case 'e-yellow':
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'yellow' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'yellow' } : item
					)
				})
				break
			case 'e-pink':
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'pink' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'pink' } : item
					)
				})
				break
			default:
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						notesArray.map((item, Index) =>
							Index === isEditing ? { ...item, bgColor: 'default' } : item
						)
					)
				)
				setNotesArray((prevNotesArray) => {
					return prevNotesArray.map((item, Index) =>
						Index === isEditing ? { ...item, bgColor: 'default' } : item
					)
				})
		}
	}

	function toggleEditorPin() {
		localStorage.setItem(
			'notesArray',
			JSON.stringify(
				notesArray.map((item, index) =>
					index === isEditing ? { ...item, isPinned: !item.isPinned } : item
				)
			)
		)
		setNotesArray((prevNotesArray) =>
			prevNotesArray.map((item, index) =>
				index === isEditing ? { ...item, isPinned: !item.isPinned } : item
			)
		)
	}

	function closeEditor(event) {
		if (event.target.className === 'note-editor-container') {
			props.toggleEditor('none')
			setDeleteAlert(false)
		}
	}

	function toggleDeleteAlert() {
		props.setDeleteAlert((prev) => !prev)
	}

	return (
		<>
			{isEditing !== 'none' && (
				<div className='note-editor-container' onClick={closeEditor}>
					<div className='note-editor'>
						<div className='note-editor-header'>
							<input
								placeholder='Title'
								name='title'
								className='note-editor-title'
								value={editingNote.title}
								onChange={handleEdit}
								type='text'
							/>
							<span
								className={editingNote.isPinned ? 'pin pinned' : 'pin'}
								onClick={toggleEditorPin}
							>
								{editingNote.isPinned ? icons.pinFill : icons.pinOutline}
							</span>
						</div>
						<textarea
							placeholder='Type here'
							onInput={props.autoSize}
							name='textInput'
							className='note-editor-textinput'
							value={editingNote.textInput}
							onChange={handleEdit}
						></textarea>
						{formatedDate}
						<EditNoteLabels
							toggleDeleteAlert={toggleDeleteAlert}
							deleteAlert={deleteAlert}
							setDeleteAlert={setDeleteAlert}
							changeNoteColor={changeNoteColor}
							editLabels={editLabels}
							setEditLabels={setEditLabels}
							labelsArray={props.labelsArray}
							setLabelsArray={props.setLabelsArray}
						/>
						<div className='save-container'>
							<button
								className='save-new-note'
								onClick={() => props.toggleEditor('none')}
							>
								close
							</button>
						</div>
					</div>
					{deleteAlert === true && (
						<DeleteAlert
							deleteNote={props.deleteNote}
							toggleDeleteAlert={toggleDeleteAlert}
							deleteAlert={deleteAlert}
							setDeleteAlert={setDeleteAlert}
						/>
					)}
				</div>
			)}
		</>
	)
}
