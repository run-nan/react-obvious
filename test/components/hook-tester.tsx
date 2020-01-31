import React from 'react';
import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line
import {Manager} from '../../src/index';
import List from './list';
import AddItemButton from './add-item-button';
import DeleteItemButton from './delete-item-button';

type propsType = {
    socket: Socket,
    showButton: boolean
}

const HookTester: React.FunctionComponent<propsType> = (props) => {
    return (
        <Manager socket={props.socket}>
            <List />
            { props.showButton ? <AddItemButton /> : null }
            <DeleteItemButton />
        </Manager>
    );
};

export default HookTester;
