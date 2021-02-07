import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SelectBox } from './components/SelectBox';

function App() {
    const selectProps = { options: ['aaa', 'bbb', 'ccc'] };
    return (
        <>
            <SelectBox {...selectProps}></SelectBox>
        </>
    );
}

export default App;
