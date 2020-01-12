import React from 'react';
import {useObviousState} from '../../src/index';

const AddItemButton: React.FunctionComponent = () => {
    const [list, setList] = useObviousState('list');
    const handleOnClick = () => {
        setList([...list, 'item']);
    };
    return (
        <button id='addItem' onClick={handleOnClick}>add item</button>
    );
};

export default AddItemButton;
