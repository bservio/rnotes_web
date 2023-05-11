import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from "../../components/Input"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"

import { Container, Form } from "./styles"
import { api } from './../../services/api';

export function New() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const [links, setLinks] = useState([])
	const [newLink, setNewLink] = useState("")

	const [tags, setTags] = useState([])
	const [newTag, setNewTag] = useState("")

	const navigate = useNavigate()

	function handleAddLink() {
		setLinks(prevState => [...prevState, newLink])
		setNewLink("")
	}

	function handleRemoveLink(deleted) {
		setLinks(prevState => prevState.filter(link => link !== deleted))
	}

	function handleAddTag() {
		setTags(prev => [...prev, newTag])
		setNewTag("")
	}

	function handleDeleteTag(deleted) {
		setTags(prev => prev.filter(tag => tag !== deleted))
	}

	async function handleNewNote() {
		if (!title) {
			return alert("Preencha o campo de título...")
		}

		if (newTag) {
			return alert("Ops.. Você esqueceu de adicionar uma tag")
		}

		if (newLink) {
			return alert("Ops.. Você esqueceu de adicionar um link")
		}

		await api.post("/notes", {
			title,
			description,
			tags,
			links
		})

		alert("Nota criada com sucesso!")

		navigate("/")
	}

	return (
		<Container>
			<Header />

			<main>
				<Form>
					<header>
						<h1>Criar nota</h1>
						<Link to="/">voltar</Link>
					</header>

					<Input
						required
						placeholder="Título"
						onChange={e => setTitle(e.target.value)}
					/>
					<TextArea
						placeholder="Observações"
						onChange={e => setDescription(e.target.value)}
					/>
					<Section title="Links úteis">
						{
							links.map((link, index) => (
								<NoteItem
									key={String(index)}
									value={link}
									onClick={() => handleRemoveLink(link)}
								/>
							))
						}
						<NoteItem
							isNew
							placeholder="Novo Link"
							value={newLink}
							onChange={e => setNewLink(e.target.value)}
							onClick={handleAddLink}
						/>
					</Section>

					<Section title="Marcadores">
						<div className="tags">
							{
								tags.map((tag, index) => (
									<NoteItem
										key={String(index)}
										value={tag}
										onClick={() => handleDeleteTag(tag)}
									/>))
							}
							<NoteItem
								isNew
								value={newTag}
								placeholder="Nova tag"
								onChange={e => setNewTag(e.target.value)}
								onClick={handleAddTag}
							/>
						</div>
					</Section>

					<Button
						title="Salvar"
						onClick={handleNewNote}
					/>
				</Form>
			</main>
		</Container>
	)
}