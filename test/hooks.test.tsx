import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Bus} from '@runnan/obvious';
import HookTester from './components/hook-tester';
import ReactTestUtils from 'react-dom/test-utils';

configure({
    adapter: new Adapter()
});

describe('Test the hooks', () => {
    const bus = new Bus();

    bus.createSocket('testSocket', [], (socket) => {
        socket.initState('list', []);
        const wrapper = mount( <HookTester socket={socket} showButton={true} /> );

        test('#case 1: init render, list should be empty', () => {
            expect(wrapper.find('li')).toHaveLength(0);
            expect(wrapper.find('button')).toHaveLength(2);
            expect(socket.getState('list')).toHaveLength(0);
        });

        test('#case 2: add a item, list should have one item ', () => {
            const addItemButton = wrapper.find('#addItem');
            addItemButton.simulate('click');
            expect(wrapper.find('li')).toHaveLength(1);
            expect(socket.getState('list')).toHaveLength(1);
            expect(socket.getState('list')[0]).toBe('item');
        });

        test('#case 3: delete a item, list should be empty', () => {
            const deleteItemButton = wrapper.find('#deleteItem');
            deleteItemButton.simulate('click');
            expect(wrapper.find('li')).toHaveLength(0);
            expect(socket.getState('list')).toHaveLength(0);
        });

        test('#case 4: add a item outside the component, list should have one item', () => {
            const list = socket.getState('list');
            list.push('item');
            ReactTestUtils.act(() => {
                socket.setState('list', list);
            });
            wrapper.update();
            expect(socket.getState('list')).toHaveLength(1);
            expect(wrapper.find('li')).toHaveLength(1);
        });

        test('#case 5: unmount the deleteButton, state should be unwatch', () => {
            wrapper.setProps({showButton: false});
            expect(wrapper.find('button')).toHaveLength(1);
        });
    });
});
