import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Note } from './../../components/Note';
import { Header } from '../../components/Header'
import { Section } from './../../components/Section';
import { TextButton } from '../../components/TextButton'

import { api } from '../../services/api';
import {
	Container,
	Brand,
	Menu,
	Search,
	Content,
	NewNote
} from './styles'

export function Home() {
	const [search, setSearch] = useState("")
	const [tags, setTags] = useState([])
	const [seletctedTags, setSelectedTags] = useState([])
	const [notes, setNotes] = useState([])

	const navigate = useNavigate()

	function handleSelectTags(selectedTag) {
		if (selectedTag === "all") {
			return setSelectedTags([])
		}

		const alreadySelected = seletctedTags.includes(selectedTag)

		if (alreadySelected) {
			const filteredTags = seletctedTags.filter(tag => tag !== selectedTag)
			setSelectedTags(filteredTags)
		} else {
			setSelectedTags(prev => [...prev, selectedTag])
		}

	}

	function handleDetails(noteId) {
		navigate(`/details/${noteId}`)
	}

	useEffect(() => {
		async function fetchTags() {
			const response = await api.get("/tags")
			setTags(response.data)
		}

		fetchTags()
	}, [])

	useEffect(() => {
		async function fetchNotes() {
			const response = await api.get(`/notes?title=${search}&tags=${seletctedTags}`)
			setNotes(response.data)
		}

		fetchNotes()
	}, [search, seletctedTags])

	return (
		<Container>
			<Brand>
				<h1>Rocketnotes</h1>
			</Brand>

			<Header />

			<Menu>
				<li>
					<TextButton
						title="Todos"
						isActive={seletctedTags.length === 0}
						onClick={() => handleSelectTags("all")}

					/>
				</li>
				{
					tags.map(tag => (
						<li key={tag.id}>
							<TextButton
								title={tag.name}
								onClick={() => handleSelectTags(tag.name)}
								isActive={seletctedTags.includes(tag.name)}
							/>
						</li>

					))
				}
			</Menu>

			<Search>
				<Input
					placeholder="Pesquisar pelo título"
					onChange={e => setSearch(e.target.value)}
					value={search}
				/>
			</Search>

			<Content>
				<Section title="Minhas notas">
					{
						notes && notes.map(note => (
							<Note
								key={note.id}
								data={note}
								onClick={() => handleDetails(note.id)}
							/>
						))
					}

				</Section>

			</Content>

			<NewNote to="/new">
				<FiPlus />
				Criar nota
			</NewNote>
		</Container>
	)
}