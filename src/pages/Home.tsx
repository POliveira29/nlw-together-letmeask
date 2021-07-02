import { Link, useHistory } from 'react-router-dom'
import { useState, FormEvent } from 'react'
import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoWhite from '../assets/images/logo-white.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button/index'
import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { ThemeProvider } from 'styled-components'
import SwitchTheme from '../components/SwitchTheme'
import GlobalStyle from '../styles/global'
import ligth from '../styles/themes/ligth'
import dark from '../styles/themes/dark'
import usePersistedState from '../hooks/usePersistedState'


export function Home(){
    const history = useHistory();
    const { user , signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');

    const [theme, setTheme] = usePersistedState('theme',ligth)
    const toggleTheme = () =>{
    setTheme(theme.title === 'light' ? dark : ligth)
    }

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event:FormEvent) {
        // Obrigatório em qualquer form do React
        event.preventDefault();

        // Verifica se existe um valor
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists');
            return;
        }

        if(roomRef.val().closedAt){
            alert('Room already close')
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                    
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
        </ThemeProvider>
    )
}