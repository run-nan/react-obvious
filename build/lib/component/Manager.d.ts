import React from 'react';
import { Socket } from '@runnan/obvious/lib/socket';
declare type propsType = {
    socket: Socket;
};
/**
 * the root component which store the context
 * @param {propsType} props props of component
 * @return {React.Component} the Context Provider
 */
declare const Manager: React.FunctionComponent<propsType>;
export default Manager;
