import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Wrapper } from './Button.styles';

type Props  = {
    text: string;
    callback: () =>  void;
};


const Button : React.FC<Props> =  ({ text,callback }) => {

    return(
        <Wrapper type='button' onClick= {callback}>
         {text}
        </Wrapper>
    )
};

export default Button;
