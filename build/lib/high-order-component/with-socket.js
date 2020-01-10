"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var socket_context_1 = tslib_1.__importDefault(require("../context/socket-context"));
/**
 * the HOC to genertate a component which can use the socket and get the state of obvious
 * @param stateNames the stateNames of obvious
 * @param Component the compoent to be wrapped
 * @return the component to return
 */
var withSocket = function (stateNames) { return function (Component) {
    var _a;
    return _a = /** @class */ (function (_super) {
            tslib_1.__extends(Wrapper, _super);
            function Wrapper(props) {
                var _this = _super.call(this, props) || this;
                var initialState = {};
                var stateChanger = {};
                var socket = _this.context;
                var _loop_1 = function (stateName) {
                    initialState[stateName] = socket.getState(stateName);
                    stateChanger[stateName] = function (newValue) {
                        var _a;
                        _this.setState((_a = {},
                            _a[stateName] = newValue,
                            _a));
                    };
                };
                for (var _i = 0, stateNames_1 = stateNames; _i < stateNames_1.length; _i++) {
                    var stateName = stateNames_1[_i];
                    _loop_1(stateName);
                }
                _this.state = initialState;
                _this.stateChanger = stateChanger;
                return _this;
            }
            ;
            Wrapper.prototype.componentDidMount = function () {
                var socket = this.context;
                var stateNames = Object.keys(this.state);
                for (var _i = 0, stateNames_2 = stateNames; _i < stateNames_2.length; _i++) {
                    var stateName = stateNames_2[_i];
                    socket.watchState(stateName, this.stateChanger[stateName]);
                }
            };
            Wrapper.prototype.componentWillUnmount = function () {
                var socket = this.context;
                for (var _i = 0, stateNames_3 = stateNames; _i < stateNames_3.length; _i++) {
                    var stateName = stateNames_3[_i];
                    socket.unwatchState(stateName, this.stateChanger[stateName]);
                }
            };
            Wrapper.prototype.render = function () {
                return react_1.default.createElement(Component, tslib_1.__assign({ socket: this.context }, this.state, this.props));
            };
            return Wrapper;
        }(react_1.default.Component)),
        _a.contextType = socket_context_1.default,
        _a;
}; };
exports.default = withSocket;
