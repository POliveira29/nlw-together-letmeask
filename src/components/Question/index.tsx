import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss'

type QuestionProps = {
    content: string;
    author:{
        name:string;
        avatar: string;
    };
    children?:ReactNode;
    isAnswerd?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author, 
    isAnswerd = false,
    isHighlighted = false,
    children,
    }: QuestionProps){
    return(
        <div className={cx(
            'question',
            { answered: isAnswerd},
            { highlighted: isHighlighted && !isAnswerd}
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}