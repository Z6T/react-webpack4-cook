import React, {Component} from 'react';
import '../assets/home.scss'

export default class Count extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="home">
              <h1 className="h-txt">This is Home Page!!!</h1>
            </div>
        )
    }
}