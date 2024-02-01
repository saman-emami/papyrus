import React, { useState, useRef, useEffect } from 'react'
import icons from '../styles/icons'

export default function Header(props) {
	const [searchOpen, setSearchOpen] = useState(false)
	const searchbar = useRef()
	const searchInput = useRef()

	function toggleMenu() {
		document.querySelector('.sidebar').classList.toggle('toggle')
		document.querySelector('.main-section').classList.toggle('toggle')
	}

	useEffect(() => {
		document.addEventListener('click', openSearch)
	}, [])

	function openSearch(event) {
		if (
			searchbar.current.contains(event.target) &&
			event.target.id !== 'close-search-icon'
		) {
			searchInput.current.focus()
			searchbar.current.className = 'searchbar-container focus'
			setSearchOpen(true)
		}
	}

	function closeSearch(event) {
		props.setSearchInput('')
		setSearchOpen(false)
		searchbar.current.className = 'searchbar-container'
	}

	return (
		<header className='page-header'>
			<span id='menu-button' className='menu-button' onClick={toggleMenu}>
				{icons.menu}
			</span>
			{searchOpen === false && <h1 className='page-title'>Papyrus</h1>}
			<div ref={searchbar} className='searchbar-container'>
				<span className='search-icon' onClick={openSearch}>
					{icons.search}
				</span>
				<input
					ref={searchInput}
					placeholder='Search'
					name='search-input'
					type='text'
					value={props.searchInput}
					className='search-bar'
					onChange={(event) => props.handleSearch(event)}
				/>
				{searchOpen === true && (
					<span className='close-search-icon' onClick={closeSearch}>
						{icons.close}
					</span>
				)}
			</div>
		</header>
	)
}
