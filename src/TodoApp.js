import React, { Component } from "react";
import moment from "moment";

function getWeek() {
    let week = moment().day()
    switch (week) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        case 0:
            return 'Sunday'
    }
}

let todoItems = [];
todoItems.push({ index: 0, value: "learn react", done: false });
todoItems.push({ index: 1, value: "Go shopping", done: false });
todoItems.push({ index: 2, value: "buy flowers", done: false });
let itemIndex = todoItems.length;

class TodoHeader extends React.Component {
    render() {
        return (
            <h1>Daily To-Do list manager</h1>
        )
    }
}

class Time extends React.Component {
    render() {
        return (
            <h2>
                <span>{getWeek()}</span><br />
                <span>{moment().format('MM-DD-YYYY')}</span>
            </h2 >
        )
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputStatus: "free" }
    }

    componentDidMount() {
        let inputInfo = document.getElementById("input-todo").value;
        if (inputInfo === "") {
            this.setState = { inputStatus: "free" }
        } else {
            this.setState = { inputStatus: "busy" }
        }
    }

    itemAdd() {
        let inputInfo = document.getElementById("input-todo").value;
        let newItem = { index: itemIndex, value: inputInfo, done: false }
        todoItems.push(newItem);
        console.log(todoItems);
    }

    render() {
        return (
            <div className="info-box">
                <input id="input-todo" type="text" placeholder="Take the garbage out" />
                <button onClick={this.itemAdd} className={this.state.inputStatus == 'free' ? "btn-add" : "btn-add active"}>+</button>
            </div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        let items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        let statusInfo = "You have " + todoItems.length + " pendding items";
        return (
            <div className="todo-list">
                <p className="status-busy">{statusInfo}</p>
                <ul className="list-group"> {items} </ul>
            </div>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        //this.onClickClose = this.onClickClose.bind(this);
        //this.onClickDone = this.onClickDone.bind(this);
    }
    /*onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }*/
    onClickDone() {
        let index = parseInt(this.props.index);
        console.log(index);
        //this.props.markTodoDone(index);
    }
    render() {
        let todoClass = this.props.item.done ?
            "done" : "undone";
        return (
            <li>
                <input type="checkbox" />
                <label onClick={this.onClickDone}></label>
                <span className="todo-text">{this.props.item.value}</span>
                <span className="delete" onClick={() => this.Listdel}>
                    <i className="icon-bin2"></i>
                </span>
            </li>
        )
    }
}

class TodoFooter extends React.Component {
    render() {
        return (
            <footer>
                <div className="github-links">
                    <a href="https://github.com/Miever1"><i className="icon-github"></i><span>Follow @miever1</span></a>
                    <a href="https://github.com/Miever1/todo-list"><i className="icon-star-full"></i><span>Star</span></a>
                </div>
            </footer>
        )
    }
}

class TodoWrapper extends React.Component {
    render() {
        return (
            <div className="todo-warpper">
                <Time />
                <TodoForm />
                <div>
                    <p className="status-free">
                        <img src="./images/beer celebration.svg" alt="" />
                        Time to chill! You have no todos.
                        </p>
                </div>
                <div>
                    <p className="status"></p>
                    <ul className="todo-list archived" id="archived"></ul>
                </div>
                <TodoList items={todoItems} />
                <ControlBtn />
            </div>
        )
    }
}

class ControlBtn extends React.Component {
    render() {
        return (
            <div className="control-buttons">
                <span id="showComplete-btn">Show Complete</span>
                <span id="clear-btn">Clear All</span>
            </div>
        )
    }
}

class TodoApp extends React.Component {

    render() {
        return (
            <div className='app'>
                <TodoHeader />
                <TodoWrapper />
                <TodoFooter />
            </div >
        )
    }
}

export default TodoApp;