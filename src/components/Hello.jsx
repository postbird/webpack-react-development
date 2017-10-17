import React, {Component} from 'react';
import logoSrc from '../images/logo.svg'

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoStyle: {
                width: '100px'
            },
            divStyle: {
                textAlign: "center"
            },
            listStyle:{
                textAlign:"left"
            }
        }
    }
    render() {
        return (
            <div style={this.state.divStyle}>
                <h1><img src={logoSrc} alt="logo" style={this.state.logoStyle}/></h1>
                <h1>Hello Webpack React</h1>
                <hr/>
                <h2>本项目使用webpack构建react开发环境</h2>
            </div>
        )
    }
}

export default Hello;