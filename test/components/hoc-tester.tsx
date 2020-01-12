import React from 'react';
import {withSocket, Manager} from '../../src/index';
import {Socket} from '@runnan/obvious/lib/Socket'; // eslint-disable-line

type propsType = {
    // props provided by hoc
    socket?: Socket,
    isDarkTheme?: boolean,
    locale?: string,
    // self-maintained props
    text: string,
};

const Tester: React.FunctionComponent<propsType> = (props) => {
    const {isDarkTheme, locale, text} = props;
    const socket = props.socket;
    const handleOnSwitchTheme = () => {
        socket.setState('isDarkTheme', !isDarkTheme);
    };
    const emitEvent = () => {
        socket.emit('testEvent', 'test');
    };
    return (
        <div>
            <p id='text'>{locale === 'en' ? text : '中文文本'}</p>
            <p id='theme'>{isDarkTheme? 'dark' : 'light'}</p>
            <button id='switchTheme' onClick={handleOnSwitchTheme}>switch theme</button>
            <button id='emitEvent' onClick={emitEvent}>emit Event</button>
        </div>
    );
};
const TesterWithSocket = withSocket<propsType>(['isDarkTheme', 'locale'])(Tester);

type hocTesterPropsType = {
    unmountTester: boolean,
    socket: Socket,
    text: string
};

const HocTester: React.FunctionComponent<hocTesterPropsType> = (props) => {
    return (
        <Manager socket={props.socket}>
            {props.unmountTester? null : <TesterWithSocket text={props.text} />}
        </Manager>
    );
};

export default HocTester;

