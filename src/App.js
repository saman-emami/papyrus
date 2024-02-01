import React, { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import "./styles/style.css"

function App() {
	const [notesArray, setNotesArray] = useState(
		localStorage.getItem("notesArray")
			? JSON.parse(localStorage.getItem("notesArray")).map((item, index) => {
					return {
						...item,
						creationTime:
							item.creationTime === 0
								? 0
								: new Date(Date.parse(item.creationTime)),
						lastEditTime:
							item.lastEditTime === 0
								? 0
								: new Date(Date.parse(item.lastEditTime)),
					}
			  })
			: [
					{
						title: "Search",
						textInput:
							"The search bar at the top can help you look through your notes",
						bgColor: "default",
						isPinned: false,
						labels: ["All", "Help"],
						creationTime: new Date(),
						lastEditTime: 0,
					},
					{
						title: "Labels",
						textInput:
							"Use the sidebar to filter notes by existing labels or create new ones if you need to",
						bgColor: "default",
						isPinned: false,
						labels: ["All", "Help"],
						creationTime: new Date(),
						lastEditTime: 0,
					},
					{
						title: "Get Started!✨",
						textInput:
							'Start your journey by using the "Take a note..." bar at the top',
						bgColor: "yellow",
						isPinned: true,
						labels: ["All", "Help"],
						creationTime: new Date(),
						lastEditTime: 0,
					},
			  ]
	)
	const [labelsArray, setLabelsArray] = useState(
		localStorage.getItem("labelsArray")
			? JSON.parse(localStorage.getItem("labelsArray"))
			: ["All", "Archive", "Help"]
	)
	const [labelFilter, setLabelFilter] = useState("All")
	const [searchInput, setSearchInput] = useState("")

	function handleSearch(event) {
		setSearchInput(event.target.value)
	}

	return (
		<>
			<Header
				setSearchInput={setSearchInput}
				searchInput={searchInput}
				handleSearch={handleSearch}
			/>
			<Sidebar
				notesArray={notesArray}
				setNotesArray={setNotesArray}
				labelFilter={labelFilter}
				setLabelFilter={setLabelFilter}
				labelsArray={labelsArray}
				setLabelsArray={setLabelsArray}
			/>
			<Main
				notesArray={notesArray}
				setNotesArray={setNotesArray}
				searchInput={searchInput}
				labelFilter={labelFilter}
				labelsArray={labelsArray}
				setLabelsArray={setLabelsArray}
			/>
		</>
	)
}

export default App
