import React from 'react';
import SocketContext from '../context/socket-context';
import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line

/**
 * the HOC to genertate a component which can use the socket and get the state of obvious
 * @param  {string[]} stateNames the states' names of obvious which you need to use
 * @param {React.Component} component the compoent to be wrapped
 * @return {React.Component} wrapped component
 */
const withSocket = <P extends object>( stateNames: string[] ) => ( Component: React.ComponentType<P> ) => { // eslint-disable-line
    return class Wrapper extends React.Component<P> {
        stateChanger: {
            [stateName: string]: (value: any) => void
        }

        static contextType = SocketContext;

        constructor(props: P, context: Socket) {
            super(props, context);
            const initialState = {};
            const stateChanger = {};
            const socket = context;
            for (const stateName of stateNames) {
                initialState[stateName] = socket.getState(stateName);
                stateChanger[stateName] = (newValue: any) => {
                    this.setState({
                        [stateName]: newValue
                    });
                };
            }
            this.state = initialState;
            this.stateChanger = stateChanger;
        };

        componentDidMount() {
            const socket = this.context;
            const stateNames = Object.keys(this.state);
            for (const stateName of stateNames) {
                socket.watchState(stateName, this.stateChanger[stateName]);
            }
        }

        componentWillUnmount() {
            const socket = this.context;
            for (const stateName of stateNames) {
                socket.unwatchState(stateName, this.stateChanger[stateName]);
            }
        }

        render() {
            return <Component socket={this.context} {...this.state} {...this.props} />;
        }
    };
};

export default withSocket;
