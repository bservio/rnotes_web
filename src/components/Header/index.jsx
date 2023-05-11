import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles";
import { useAuth } from './../../hooks/auth';
import { api } from './../../services/api';
import placeHolderImg from '../../assets/avatar_placeholder.svg'

export function Header() {

	const { logOut, user } = useAuth()

	const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : placeHolderImg


	return (
		<Container>
			<Profile to='/profile'>
				<img
					src={avatarUrl}
					alt="Foto de Usuário"
				/>
				<div>
					<span>Bem vindo, </span>
					<strong>{user.name}</strong>
				</div>
			</Profile>

			<Logout onClick={logOut}>
				<RiShutDownLine />
			</Logout>
		</Container>
	)
}