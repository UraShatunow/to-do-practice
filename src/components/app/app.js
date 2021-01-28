import React, { Component } from 'react';
import Header from '../header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';
import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todos: [
      this.createTodoItem('Eat breakfast'),
      this.createTodoItem('Have a bath'),
      this.createTodoItem('Make an App')
    ],
    filter: 'all',
    term: ''
  };

  createTodoItem(label) {
    const newItem = {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }

    return newItem;
  };

  addItem = (text) => {
    
    const newItem = this.createTodoItem(text);
    const newArr = [ ...this.state.todos, newItem ];

    this.setState({todos: newArr});
  };

  deleteItem = (id) => {
    this.setState(({ todos }) => {

      const idx = todos.findIndex((el) => el.id === id);

      const before = todos.slice(0, idx);
      const after = todos.slice(idx + 1);
      const newArr = [ ...before, ...after];

      return {
        todos: newArr
      }

    });
  };

  onToggleProperty(id, arr, prop) {

      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [prop]: !oldItem[prop] };

      const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]

      return newArr;
  }

  onToggleImportant = (id) => {
    this.setState(({todos}) => {
      return {
        todos: this.onToggleProperty(id, todos, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todos}) => {
      return {
        todos: this.onToggleProperty(id, todos, 'done')
      }
    })
  }

  activeRender = () => {
    this.setState(({todos}) => {

      const newArr = todos.filter((item) => !item.done);

      return {
        todos: newArr
      }
    })
  }

  filterStatus(todos, filter) {
    
    switch(filter) {
      case 'all':
        return todos;
      case 'active': 
        return todos.filter((item) => !item.done);
      case 'done':
        return todos.filter((item) => item.done);
      default: 
        return todos;
    }

  }

  buttonStatusChange = (filter) => {
    this.setState({
      filter: filter
    })
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  onSearch = (todos, searchValue) => {

    if (todos.length === 0) {
      return todos
    }

    return todos.filter((item) => {
      return item.label.toLowerCase().includes(searchValue.toLowerCase()) 
    })
  }

  render() {

    const { todos, filter, term } = this.state;
    const visibleItems = this.filterStatus(this.onSearch(todos, term), filter);

    const doneCount = todos.filter((item) => item.done).length;
    const todoCount = todos.length - doneCount;

    return (
      <div className="app">
        <Header todo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel 
            onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter
            filter={filter}
            onButtonStatusChange={this.buttonStatusChange} />
        </div>
        <TodoList todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <AddItem onAdded={this.addItem} />
      </div>
    );

  };
};

