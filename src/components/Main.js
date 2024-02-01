import React, { useEffect, useState } from "react"
import NewNote from "./NewNote"
import NoteCard from "./NoteCard"
import NoteColumns from "./NoteColumns"
import NoteEditor from "./NoteEditor"

export default function Main({ setNotesArray, notesArray, ...props }) {
	const [isInitial, setisInitial] = useState(true)

	const [deleteAlert, setDeleteAlert] = useState(false)
	const [editLabels, setEditLabels] = useState([])
	const [isEditing, setIsEditing] = useState("none")
	const NoteCardElements = notesArray.map((item, index) => (
		<NoteCard
			labels={item.labels}
			index={index}
			key={index}
			notesArray={notesArray}
			setNotesArray={setNotesArray}
			toggleEditor={toggleEditor}
		/>
	))

	function handleAddNote(newNote) {
		const creationTime = new Date()
		newNote.creationTime = creationTime
		localStorage.setItem("notesArray", JSON.stringify([...notesArray, newNote]))
		setNotesArray((prevNotesArray) => {
			return [...prevNotesArray, newNote]
		})
	}
	useEffect(() => {
		if (!isInitial) {
			localStorage.setItem(
				"notesArray",
				JSON.stringify(
					notesArray.map((item, index) =>
						index === isEditing ? { ...item, labels: editLabels } : item
					)
				)
			)
		}

		if (isInitial === true) {
			setisInitial(false)
		}

		setNotesArray((prevNotesArray) =>
			prevNotesArray.map((item, index) =>
				index === isEditing ? { ...item, labels: editLabels } : item
			)
		)
	}, [editLabels, isEditing])

	function toggleEditor(index) {
		if (index !== "none") {
			setEditLabels(notesArray[index].labels)
		}
		setIsEditing(index)
		setDeleteAlert(false)
	}

	function autoSize(event) {
		event.target.style.setProperty("height", event.target.scrollHeight + "px")
	}

	function deleteNote() {
		const deleteIndex = isEditing
		setIsEditing("none")
		localStorage.setItem(
			"notesArray",
			JSON.stringify(notesArray.filter((item, index) => index !== deleteIndex))
		)
		setNotesArray((prevNotesArray) =>
			prevNotesArray.filter((item, index) => index !== deleteIndex)
		)
	}

	return (
		<main id="main-section" className="main-section">
			<NoteEditor
				deleteNote={deleteNote}
				deleteAlert={deleteAlert}
				setDeleteAlert={setDeleteAlert}
				autoSize={autoSize}
				editLabels={editLabels}
				setEditLabels={setEditLabels}
				isEditing={isEditing}
				toggleEditor={toggleEditor}
				setNotesArray={setNotesArray}
				notesArray={notesArray}
				labelsArray={props.labelsArray}
				setLabelsArray={props.setLabelsArray}
			/>
			<NewNote
				labelFilter={props.labelFilter}
				autoSize={autoSize}
				handleAddNote={handleAddNote}
				labelsArray={props.labelsArray}
				setLabelsArray={props.setLabelsArray}
			/>
			<NoteColumns
				searchInput={props.searchInput}
				labelFilter={props.labelFilter}
				elements={NoteCardElements}
			/>
		</main>
	)
}
