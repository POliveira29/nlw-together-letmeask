import React, { useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';

import { RoomCode } from '../RoomCode';

import logoWhite from '../../assets/images/logo-white.svg'
import logoImg from '../../assets/images/logo.svg'
import { Header, Wrapper } from './styles'
import { ThemeContext} from 'styled-components'
import SwitchTheme from '../SwitchTheme';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button';
import { database } from '../../services/firebase';

interface Props {
    toggleTheme(): void;
}

type RoomParams = {
    id: string;
}

const RoomHeader: React.FC<Props> = ({toggleTheme}) => {
    const mode = useContext(ThemeContext);

    const { user } = useAuth()
    const history = useHistory();
    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })      
        
        history.push('/')
    }

    const params = useParams<RoomParams>();
    const roomId = params.id;
    return(
        <Header>
                <div className="content">
                {mode.title ===  'dark' ? (
                        <Link to="/"><img src={logoWhite} alt="Letmeask" aria-label="Ir para home" /></Link>                      
                    ) : (
                        <Link to="/"><img src={logoImg} alt="Letmeask" aria-label="Ir para home" /></Link>
                    )
                    }
                    
                    <Wrapper>
                        <SwitchTheme toggleTheme={toggleTheme}/>
                        <RoomCode code={roomId} />
                    </Wrapper>
                </div>
        </Header>  
    );
};

export default RoomHeader