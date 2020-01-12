import useSocket from '../hooks/use-socket';
import {useState, useEffect} from 'react';
import {Socket} from '@runnan/obvious/lib/Socket'; // eslint-disable-line

/**
 * the hook to get and set state of obvious
 * @param {string} stateName the stateName of the obvious state
 * @return {[any, Function]} [value, setValue] corresponding to the value of obvious' state and the method to set the value
 */
function useObviousState(stateName: string) {
    const socket: Socket = useSocket();
    const initState: any = socket.getState(stateName);
    const [obviousState, setObviousState] = useState(initState);

    useEffect(() => {
        const callback = (newValue: any) => {
            setObviousState(newValue);
        };
        socket.watchState(stateName, callback);
        return () => {
            socket.unwatchState(stateName, callback);
        };
    }, [stateName, socket]);

    const value = obviousState;
    const setValue = (newValue: any) => {
        socket.setState(stateName, newValue);
    };

    return [value, setValue];
};

export default useObviousState;
