import React, {Component} from 'react';
import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    }

    takeValue = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <div>
                <form className="form"
                        onSubmit={this.onSubmit}>
                    <input type="text" placeholder="What needs to be done" className="form-input"
                        onChange={this.takeValue}
                        value={this.state.label} />
                    <button className="btn btn-light">Add Item</button>
                </form>
            </div>
          )
    }
}