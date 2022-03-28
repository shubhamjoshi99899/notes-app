import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import Swal from 'sweetalert2';
const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '25/03/2022',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '26/03/2022',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '27/03/2022',
		},
		
	]);

	const [searchText, setSearchText] = useState('');

	

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		Swal.fire({
			title: 'Do you want to save the changes?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Save',
			denyButtonText: `Don't save`,
		  }).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			  Swal.fire('Deleted!', '', 'success')
			  const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
			} else if (result.isDenied) {
			  Swal.fire('Changes are not saved', '', 'info')
			}
		  })
		
	
	};

	return (
		<div>
			<div className='container'>
				<Header />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
				<footer>
             <p style={{textAlign:'center', marginTop:'10rem'}}>Copyright © 2022 Shubham Joshi</p>
         </footer>
			</div>
		</div>
	);
};

export default App;
