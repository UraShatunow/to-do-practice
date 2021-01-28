import React, { Component } from 'react';
import "./todo-list-item.css";

export default class TodoListItem extends Component {

    render() {

        const { label, onDeleted,
                onToggleImportant,
                onToggleDone,
                important, done } = this.props;

        const style = {
            color: important ? 'tomato' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        }

        let clazzName = 'todo-list-item-label';

        if (done) {
            clazzName += ' done';
        }

        if (important) {
            clazzName += ' important'
        }

        return (
            <span className="todo-list-item">
                <span
                    className={clazzName}
                    style={style}
                    onClick={onToggleDone}>
                    {label}
                </span>
    
                <div>
                    <button type="button"
                            className="todo-list-item-button btn btn-outline-success btn-sm float-right"
                            onClick={onToggleImportant}>
                        <i className="fa fa-exclamation" />
                    </button>
    
                    <button type="button"
                            className="todo-list-item-button btn btn-outline-danger btn-sm float-right"
                            onClick={onDeleted}>
                        <i className="fa fa-trash-o" />
                    </button>
                </div>
            </span>
        )
    }

}
