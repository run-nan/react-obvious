import React from 'react';
import SocketContext from '../context/socket-context';
import {Socket} from '@runnan/obvious/lib/Socket'; // eslint-disable-line

type propsType = {
    socket: Socket
}

/**
 * the root component which store the context
 * @param {propsType} props props of component
 * @return {React.Component} the Context Provider
 */
const Manager: React.FunctionComponent<propsType> = (props) => {
    return (
        <SocketContext.Provider value={props.socket}>
            {props.children}
        </SocketContext.Provider>
    );
};

export default Manager;
