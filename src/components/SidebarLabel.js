import React from 'react'
import icons from '../styles/icons'

export default function SidebarLabel(props) {
	return (
		<li
			data-label={props.label}
			className={
				props.label === props.labelfilter
					? 'note-label-sidebar selected'
					: 'note-label-sidebar'
			}
			onClick={() => props.filterClick(props.label)}
		>
			{props.label === 'All' && (
				<span
					data-label={props.label}
					className={
						props.label === props.labelfilter ? 'label-icon selected' : 'label-icon'
					}
				>
					{icons.all}
				</span>
			)}
			{props.label === 'Archive' && (
				<span
					data-label={props.label}
					className={
						props.label === props.labelfilter ? 'label-icon selected' : 'label-icon'
					}
				>
					{icons.archive}
				</span>
			)}
			{props.label !== 'Archive' && props.label !== 'All' && (
				<span
					data-label={props.label}
					className={
						props.label === props.labelfilter ? 'label-icon selected' : 'label-icon'
					}
				>
					{props.editingLabels === true ? icons.delete : icons.label}
				</span>
			)}
			{props.label}
		</li>
	)
}
