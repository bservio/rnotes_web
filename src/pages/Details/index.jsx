import { Container, Links, Content } from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Tag } from "../../components/Tag";
import { Section } from "../../components/Section";
import { TextButton } from "../../components/TextButton";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from './../../services/api';

export function Details() {
	const [data, setData] = useState(null)

	const params = useParams()

	const navigate = useNavigate()

	function handleBack() {
		navigate("/")
	}

	async function handleDelete() {
		const confirm = window.confirm("Deseja excluir essa nota?")

		if (confirm) {
			await api.delete(`/notes/${params.id}`)
			navigate("/")
		}
	}

	useEffect(() => {
		async function fetchData() {
			const response = await api.get(`/notes/${params.id}`)
			setData(response.data)
		}
		fetchData()

	}, [])
	return (
		<Container>
			<Header />

			{
				data &&
				<main>
					<Content>
						<TextButton
							onClick={handleDelete}
							title="Excluir Nota"
						/>

						<h1>{data.title}</h1>

						<p>{data.description}</p>

						{
							data.links &&
							<Section title="Links úteis">
								<Links>
									{
										data.links.map(link => (
											<li key={String(link.id)}>
												<a href={link.url}>
													{link.url}
												</a>
											</li>
										))
									}
								</Links>
							</Section>
						}

						{
							data.tags &&
							<Section title="Marcadores">
								{
									data.tags.map(tag => (
										<Tag
											key={String(tag.id)}
											title={tag.name}
										/>
									))
								}
							</Section>
						}
						<Button
							title="Volar"
							onClick={handleBack}
						/>
					</Content>
				</main>
			}

		</Container>
	)
}