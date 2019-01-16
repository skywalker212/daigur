import React from 'react';
import './button.css';

let Button = (props)=>(
    <button onClick={props.onClick} className={`${props.className} ret-btn`}>{props.text}</button>
);

export default Button;