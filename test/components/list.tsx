import React from 'react';
import {useObviousState} from '../../src/index';

const List: React.FunctionComponent = () => {
    const [list] = useObviousState('list');
    return (
        <ul>
            {
                list.map((item:string) => {
                    return <li key={item}>{item}</li>;
                })
            }
        </ul>
    );
};

export default List;
