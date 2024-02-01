import React, { useEffect, useRef, useState } from 'react'
import SidebarLabel from './SidebarLabel'
import EditLabels from './EditLabels'

export default function Sidebar(props) {
	const [editingLabels, setEditingLabels] = useState(false)
	const [newLabelInput, setNewLabelInput] = useState('')
	const sidebar = useRef()
	const labelEditorContainer = useRef()
	const labelsElements = props.labelsArray.map((item) => (
		<SidebarLabel
			key={item}
			editingLabels={editingLabels}
			label={item}
			labelfilter={props.labelFilter}
			filterClick={filterClick}
		/>
	))

	function filterClick(label) {
		if (editingLabels === false) {
			props.setLabelFilter(label)
		} else {
			if (label !== 'All' && label !== 'Archive') {
				localStorage.setItem(
					'notesArray',
					JSON.stringify(
						props.notesArray.filter((item) => !item.labels.includes(label))
					)
				)
				props.setNotesArray((prev) =>
					prev.filter((item) => !item.labels.includes(label))
				)

				localStorage.setItem(
					'labelsArray',
					JSON.stringify(props.labelsArray.filter((item) => item !== label))
				)
				props.setLabelsArray((prev) => prev.filter((item) => item !== label))
			}
		}
	}

	useEffect(() => document.addEventListener('click', closeSidebar), [])
	function closeSidebar(event) {
		if (
			window.innerWidth < 900 &&
			!sidebar.current.contains(event.target) &&
			sidebar.current.classList.contains('toggle') &&
			!document.getElementById('menu-button').contains(event.target) &&
			event.target.id !== 'finish-label-edit' &&
			labelEditorContainer.current.className !== 'label-editor-container open'
		) {
			document.querySelector('.sidebar').classList.toggle('toggle')
			document.querySelector('.main-section').classList.toggle('toggle')
		}
	}

	function newSidebarLabel() {
		const newLabelElement = document.getElementById('new-label-sidebar')
		if (
			newLabelElement.value !== '' &&
			!props.labelsArray.includes(newLabelElement.value)
		) {
			localStorage.setItem(
				'labelsArray',
				JSON.stringify([...props.labelsArray, newLabelElement.value])
			)
			props.setLabelsArray((prevLabelsArray) => {
				return [...prevLabelsArray, newLabelElement.value]
			})
			newLabelElement.value = ''
			setNewLabelInput('')
		}
	}

	function enterKeyDown(event) {
		if (event.key === 'Enter') {
			newSidebarLabel()
		}
	}

	return (
		<aside ref={sidebar} className='sidebar'>
			{labelsElements}
			<EditLabels
				labelEditorContainer={labelEditorContainer}
				setNewLabelInput={setNewLabelInput}
				newLabelInput={newLabelInput}
				labelFilter={props.labelFilter}
				setLabelFilter={props.setLabelFilter}
				editingLabels={editingLabels}
				setEditingLabels={setEditingLabels}
				enterKeyDown={enterKeyDown}
				newSidebarLabel={newSidebarLabel}
			/>
			{editingLabels === true && <div className='edit-label-shadow'></div>}
		</aside>
	)
}
