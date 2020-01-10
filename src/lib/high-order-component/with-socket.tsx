import React from 'react';
import SocketContext from '../context/socket-context';

/**
 * the HOC to genertate a component which can use the socket and get the state of obvious
 * @param stateNames the stateNames of obvious
 * @param Component the compoent to be wrapped
 * @return the component to return
 */
const withSocket = <P extends object>( stateNames: string[] ) => ( Component: React.ComponentType<P> ) => { // eslint-disable-line
    return class Wrapper extends React.Component<P> {
        stateChanger: {
            [stateName: string]: (value: any) => void
        }

        static contextType = SocketContext;

        constructor(props: P) {
            super(props);
            const initialState = {};
            const stateChanger = {};
            const socket = this.context;
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
