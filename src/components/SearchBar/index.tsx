import React, {useState,useEffect, useRef} from 'react';


// Images
import searchIcon from '../../images/search-icon.svg';

// Styles
import { Wrapper, Content } from './SearchBar.styles';

type Props = {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  }

const SearchBar : React.FC<Props> = ({ setSearchTerm }) => {

    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect (() => {
        if(initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        },500)
        return () => clearTimeout(timer);
    },[state, setSearchTerm]);

    return(
        <Wrapper >
            <Content>
                <img src={ searchIcon } alt='search_icon'/>
                <input
                    type='text' 
                    placeholder='Serach Movie'
                    onChange={ event => setState(event.currentTarget.value) }
                    value={state}
                />
            </Content>
        </Wrapper>
    )
};


export default SearchBar;
