"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var socket_context_1 = tslib_1.__importDefault(require("../context/socket-context"));
/**
 * the hook to get the socket from context
 * @return {Function} the context which store the socket
 */
function useSocket() {
    return react_1.useContext(socket_context_1.default);
}
;
exports.default = useSocket;
