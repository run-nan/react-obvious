import {useContext} from 'react';
import SocketContext from '../context/socket-context';

/**
 * the hook to get the socket from context
 * @return {Function} the context which store the socket
 */
function useSocket() {
    return useContext(SocketContext);
};

export default useSocket;
