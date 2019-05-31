import React, {Component} from 'react';

export default class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                当前count值：{this.state.count}<br/>
                <button onClick={() => this.handleClick()}>增加ghhgfghrtert1</button>
            </div>
        )
    }
}