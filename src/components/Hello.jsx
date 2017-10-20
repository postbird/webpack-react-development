import React, { Component } from 'react';

class Hello extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Hello Webpack React</h1>
                <hr />
                <h2>本项目使用webpack构建react开发环境</h2>
            </div>
        )
    }
}

export default Hello;