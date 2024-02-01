import React, { useState, useEffect } from 'react'

export default function NoteColumns(props) {
	const searchedElements = props.elements.filter(
		(item) =>
			item.props.notesArray[item.props.index].title
				.toLowerCase()
				.includes(props.searchInput.toLowerCase()) ||
			item.props.notesArray[item.props.index].textInput
				.toLowerCase()
				.includes(props.searchInput.toLowerCase())
	)
	const filteredElements = searchedElements.filter((item) =>
		item.props.notesArray[item.props.index].labels.includes(props.labelFilter)
	)
	const pinSortedElements = [
		...filteredElements.filter(
			(item) => item.props.notesArray[item.props.index].isPinned === false
		),
		...filteredElements.filter(
			(item) => item.props.notesArray[item.props.index].isPinned === true
		),
	]
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions)
	}, [])

	function setWindowDimensions() {
		setWindowWidth(window.innerWidth)
	}

	if (pinSortedElements.length !== 0 && windowWidth > 1500) {
		return (
			<div className='note-columns'>
				<div className='note-cards-container row-one'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 5 === pinSortedElements.length % 5
					)}
				</div>
				<div className='note-cards-container row-two'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 5 === (pinSortedElements.length - 1) % 5
					)}
				</div>
				<div className='note-cards-container row-three'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 5 === (pinSortedElements.length - 2) % 5
					)}
				</div>
				<div className='note-cards-container row-four'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 5 === (pinSortedElements.length - 3) % 5
					)}
				</div>
				<div className='note-cards-container row-five'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 5 === (pinSortedElements.length - 4) % 5
					)}
				</div>
			</div>
		)
	} else if (pinSortedElements.length !== 0 && windowWidth > 1200) {
		return (
			<div className='note-columns'>
				<div className='note-cards-container row-one'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 4 === pinSortedElements.length % 4
					)}
				</div>
				<div className='note-cards-container row-two'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 4 === (pinSortedElements.length - 1) % 4
					)}
				</div>
				<div className='note-cards-container row-three'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 4 === (pinSortedElements.length - 2) % 4
					)}
				</div>
				<div className='note-cards-container row-four'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 4 === (pinSortedElements.length - 3) % 4
					)}
				</div>
			</div>
		)
	} else if (pinSortedElements.length !== 0 && windowWidth > 900) {
		return (
			<div className='note-columns'>
				<div className='note-cards-container row-one'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 3 === pinSortedElements.length % 3
					)}
				</div>
				<div className='note-cards-container row-two'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 3 === (pinSortedElements.length - 1) % 3
					)}
				</div>
				<div className='note-cards-container row-three'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 3 === (pinSortedElements.length - 2) % 3
					)}
				</div>
			</div>
		)
	} else if (pinSortedElements.length !== 0 && windowWidth > 600) {
		return (
			<div className='note-columns'>
				<div className='note-cards-container row-one'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 2 === pinSortedElements.length % 2
					)}
				</div>
				<div className='note-cards-container row-two'>
					{pinSortedElements.filter(
						(item, index) => (index + 1) % 2 === (pinSortedElements.length - 1) % 2
					)}
				</div>
			</div>
		)
	} else if (pinSortedElements.length !== 0) {
		return (
			<div className='note-columns'>
				<div className='note-cards-container row-one'>{pinSortedElements}</div>
			</div>
		)
	} else {
		return (
			<div className='empty-message'>
				<p>empty</p>
			</div>
		)
	}
}
