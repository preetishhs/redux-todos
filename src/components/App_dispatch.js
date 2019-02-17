import React, { Component } from "react";
import "./App.css";
import { connect } from 'react-redux';

class App extends Component {
  renderList() {
    return this.props.todos.map(item => {
      return (
        <li  
          key={item.id}
          className={"todo " + (item.completed ? "completed" : "")}
          onClick={() => this.props.toggleCompletion(item.id)}
          >
          <div className="view">
            <label> { item.title } </label>
            <button className="destroy" 
              onClick={() => this.props.removeItem(item.id)}
            />
          </div>
        </li>
      )
    })
  }

  completedList() {
    return this.props.todos.filter(item => item.completed === true);
  }

  addItemToList(event) {
    if(event.keyCode === 13 && event.target.value.trim()) {
      this.props.addItem(event.target.value);
      event.target.value = '';
    }
  }
  
  render() {
    return (
      <section>
        <h1>TO DO LIST</h1>
        <div className="todoapp">
          <header className="header">
            <input
              className="new-todo"
              autoFocus
              autoComplete="off"
              placeholder="What's on your Mind?"
              onKeyUp = {(event) => this.addItemToList(event)}
            />
          </header>
          {this.props.todos.length ?
            <div>
              <section className="main">
                <ul className="todo-list">
                  {this.renderList()}
                </ul>
              </section>
            <footer className="footer">
              <div className="total">Items: {this.props.todos.length}</div>
              <div className="completed">Completed: {this.completedList().length}</div>
            </footer>
            </div>
          : null }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: state };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCompletion: (id) => dispatch({type:'TOGGLE_COMPLETION', id}),
    addItem: (title) => dispatch({type: 'ADD_ITEM', title}),
    removeItem: (id) => dispatch({type: 'REMOVE_ITEM', id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
