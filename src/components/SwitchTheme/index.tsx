import React, { useContext } from 'react'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'

interface Props {
    toggleTheme(): void;
}

const SwitchTheme: React.FC<Props> = ({ toggleTheme }) => {
    const { title, colors } = useContext(ThemeContext)

    return(
            <div className="switch-button">
            <Switch
                className="switch-theme"
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={25}
                height={20}
                width={50}
                activeBoxShadow="0px 0px 1px 4px rgba(0, 0, 0, 0.2)"
                offHandleColor={colors.secundary}
                onHandleColor={colors.primary}
                offColor={colors.primary}
                onColor={colors.secundary}
            />
            </div>
    );
};

export default SwitchTheme