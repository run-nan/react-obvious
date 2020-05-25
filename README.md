# react-obvious

- ## 介绍

[obvious](https://github.com/SMIELPF/obvious)实现了一套事件通信机制，在此基础上封装了状态管理功能，从而实现了屏蔽了技术栈的前端微服务间的通信。obvious本身只提供通信能力，各微服务在通过socket收发事件或者读写状态之后，还需要再各自执行更新UI的操作。而react-obvious可以帮助你在开发react微服务时，方便地在各组件中获取socket来与其他微服务进行事件通信。同时，react-obvious帮助你实现了obvious状态变化后更新react组件状态的逻辑，让你在读写obvious状态的时候，只需要专注于数据，不再需要手动更新UI。obvious和react-obvious的关系同redux和react-redux的关系是一样的，事实上，react-obvious的核心API也几乎完全参照react-redux的核心API，方便开发者快速上手

- ## 使用

下载依赖包

```javaScript
npm install react @runnan/obvious @runnan/react-obvious
```

在平台微服务中创建bus

```javaScript
import {createBus} from '@runnan/obvious';

createBus('global', {
    reactApp: {
        js: ['/assets/js/reactApp.js'],
        css: ['/assets/css/reactApp.js']
    }
});
```

创建reactApp的socket

```javaScript
// /assets/js/reactApp.js
import {Manager} from '@runnan/react-obvious';
import {getBus} from '@runnan/obvious';

getBus('global').createSocket('reactApp', ['state1'], (socket, config) => {
    // 初始化状态
    socket.initState('state2', 'value2');

    // 将socket作为props传递给Manager组件，执行react渲染
    ReactDOM.render(
        <Manager socket={socket}>
            <App />
        </Manager>
    , config.container);
});

```

在下层组件中通过hook读写bus管理的状态以及收发事件

```javaScript
import {useObviousState, useSocket} from '@runnan/react-obvious';

const ChildComponent = (props) => {
    const socket = useSocket();
    const [state1, setState1] = useObviousState('state1');

    const handleOnChange = (event) => {
        setState1(event.target.value);
    };

    const handleOnClick = () => {
        socket.emit('someEvent');
    };

    return (
        <div>
            <p>{state1}</p>
            <textarea onChange={handleOnChange} value={state1} />
            <button onClick={handleOnClick}>emit an event</button>
        </div>
    );
}
```

也可以用高阶组件withSocket获取状态和socket

```javaScript
import {withSocket} from '@runnan/react-obvious';

const ChildComponent = (props) => {
    const {state1, state2, socket} = props;
    const handleOnChange = (event) => {
        setState1(event.target.value);
    };

    const handleOnClick = () => {
        socket.emit('someEvent');
    };

    return (
        <div>
            <p>{state2}</p>
            <textarea onChange={handleOnChange} value={state1} />
            <button onClick={handleOnClick}>emit an event</button>
        </div>
    );
}

export default withSocket(['state1', 'state2'])(ChildCompoennt);

```

- ## API

  - **【组件】： Manager**

    |props|是否可选|类型|描述|
    |:---:|:---:|:---:|:---:|
    |socket|否|obvious.Socket|微服务对应的socket实例|

    Manager组件的作用类似react-redux中的Provider组件，它将socket放在context中，供子组件使用
    <br/>

  - **【hook】：useObviousState**

    |参数|是否可选|类型|描述|
    |:---:|:---:|:---:|:---:|
    |stateName|否|string|状态名|

    useObviousState的返回值和react基础hook：useState返回值相同，都是一个数组，数组第一个元素是状态值， 第二个值是修改状态的方法（该方法目前只接收状态的新值作为参数，不接受修改状态的函数作为参数），不同在于，useObviousState在修改react组件状态的同时，也会修改bus管理的状态。
    <br/>

  - **【hook】：useSocket**
  
    useSocket不接收参数，直接返回Manager所管理的socket实例
    <br/>

  - **【hoc】：withSocket**

    |参数|是否可选|类型|描述|
    |:---:|:---:|:---:|:---:|
    |stateNames|否|string[]|状态名数组|
    |component|否|React.Component|待包装的组件|

    同react-redux的connect高阶组件一样，withSocket用了柯里化的写法，因此接收的两个参数应该通过这种方式传递：`withSocket(stateNames)(component)`, stateNames是所依赖的obvious状态名数组，withSocket高阶组件会将这些状态值分别以props[stateName]传递给component，同时也会将socket实例以props.socket传递给component

