import React from 'react';
import {SocketContext} from './socket-context';
import {Socket} from '@runnan/obvious/lib/Socket'; // eslint-disable-line

type propsType = {
    socket: Socket
}

export const Manager: React.FunctionComponent<propsType> = (props) => {
    return (
        <SocketContext.Provider value={props.socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
