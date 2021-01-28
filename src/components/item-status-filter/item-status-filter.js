import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component { 

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  render() {

    const buttons = this.buttons.map(({name, label}) => {

      const isActive = name === this.props.filter;
      const clazz = isActive ? 'btn-danger' : 'btn-success'

      return (
        <button type="button"
                className={`btn btn-item-status-filter ${clazz}`}
                onClick={() => this.props.onButtonStatusChange(name)}
                key={name}>{label}</button>
      )
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }

}


