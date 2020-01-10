"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var use_socket_1 = tslib_1.__importDefault(require("../hooks/use-socket"));
var react_1 = require("react");
/**
 * the hook to get and set state of obvious
 * @param stateName the stateName of the obvious state
 * @return [value, setValue] corresponding to the value of obvious' state and the method to set the value
 */
function useObviousState(stateName) {
    var socket = use_socket_1.default();
    var initState = socket.getState(stateName);
    var _a = react_1.useState(initState), obviousState = _a[0], setObviousState = _a[1];
    react_1.useEffect(function () {
        var callback = function (newValue) {
            setObviousState(newValue);
        };
        socket.watchState(stateName, callback);
        return function () {
            socket.unwatchState(stateName, callback);
        };
    }, [stateName, socket]);
    var value = obviousState;
    var setValue = function (newValue) {
        socket.setState(stateName, newValue);
    };
    return [value, setValue];
}
;
exports.default = useObviousState;
