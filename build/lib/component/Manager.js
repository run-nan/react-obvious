"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var socket_context_1 = tslib_1.__importDefault(require("../context/socket-context"));
/**
 * the root component which store the context
 * @param {propsType} props props of component
 * @return {Component} the Context Provider
 */
var Manager = function (props) {
    return (react_1.default.createElement(socket_context_1.default.Provider, { value: props.socket }, props.children));
};
exports.default = Manager;
