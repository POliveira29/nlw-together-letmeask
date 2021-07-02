import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoWhite from '../assets/images/logo-white.svg'
import '../styles/auth.scss'

import { Button } from '../components/Button/index'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { ThemeProvider } from 'styled-components'
import SwitchTheme from '../components/SwitchTheme'
import GlobalStyle from '../styles/global'
import ligth from '../styles/themes/ligth'
import dark from '../styles/themes/dark'
import usePersistedState from '../hooks/usePersistedState'

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    const [theme, setTheme] = usePersistedState('theme',ligth)
    const toggleTheme = () =>{
    setTheme(theme.title === 'light' ? dark : ligth)
    }

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // Verifica se realmente existe algum texto, para evitar criar uma sala sem nome.
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return(
        <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizado perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                <SwitchTheme toggleTheme={toggleTheme} />
                {theme.title ===  'dark' ? (
                        <Link to="/"><img src={logoWhite} alt="Letmeask" aria-label="Ir para home" /></Link>                      
                    ) : (
                        <Link to="/"><img src={logoImg} alt="Letmeask" aria-label="Ir para home" /></Link>
                    )
                    }
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit = {handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
        </ThemeProvider>
    )
}