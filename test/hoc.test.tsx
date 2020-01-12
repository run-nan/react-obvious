import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Bus} from '@runnan/obvious';
import HocTester from './components/hoc-tester';
import ReactTestUtils from 'react-dom/test-utils';

configure({
    adapter: new Adapter()
});

describe('Test the hooks', () => {
    const bus = new Bus();

    bus.createSocket('testSocket', [], (socket) => {
        socket.initState('isDarkTheme', false);
        socket.initState('locale', 'en');
        const wrapper = mount(<HocTester socket={socket} unmountTester={false} text='hello'/>);

        test('#case 1: initial render, all props should be initialized', () => {
            expect(wrapper.find('#text').text()).toBe('hello');
            expect(wrapper.find('#theme').text()).toBe('light');
        });

        test('#case 2: switch theme, theme should be switched', () => {
            const switchThemeButton = wrapper.find('#switchTheme');
            switchThemeButton.simulate('click');
            expect(wrapper.find('#theme').text()).toBe('dark');
            expect(socket.getState('isDarkTheme')).toBeTruthy();
            switchThemeButton.simulate('click');
            expect(wrapper.find('#theme').text()).toBe('light');
            expect(socket.getState('isDarkTheme')).toBeFalsy();
        });

        test('#case 3: change locale outside the component, locale should update in the component', () => { // eslint-disable-line
            ReactTestUtils.act(() => {
                socket.setState('locale', 'zh');
            });
            wrapper.update();
            expect(wrapper.find('#text').text()).toBe('中文文本');
        });

        test('#case 4: emit an event inside the component, callback should be called', () => {
            console.log = jest.fn();
            socket.on('testEvent', (msg) => {
                console.log(msg);
            });
            const emitEventButton = wrapper.find('#emitEvent');
            emitEventButton.simulate('click');
            expect(console.log).toBeCalledWith('test');
        });

        test('#case 5: unmount the component, state should be unwatched', () => {
            wrapper.setProps({unmountTester: true});
            expect(wrapper.find('p')).toHaveLength(0);
        });
    });
});
