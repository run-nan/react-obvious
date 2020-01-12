import React from 'react';
import {useSocket} from '../../src/index';

const DeleteItemButton: React.FunctionComponent = () => {
    const socket = useSocket();
    const handleOnClick = () => {
        const oldList = socket.getState('list');
        const newList = [...oldList.slice(0, oldList.length-1)];
        socket.setState('list', newList);
    };
    return (
        <button id='deleteItem' onClick={handleOnClick}>add item</button>
    );
};

export default DeleteItemButton;
