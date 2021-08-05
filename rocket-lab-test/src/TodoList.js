import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        this.itemCount = 0;
        this.completedCount = 0;

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.increasePriorityItem = this.increasePriorityItem.bind(this);
        this.decreasePriorityItem = this.decreasePriorityItem.bind(this);
    }

    //Add Item to List
    addItem(e) {
        if (this._inputElement.value !== "") {
            const newItem = {
                text: this._inputElement.value,
                key: Math.random(),
                priority: "medium",
                completed: false,
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            this.itemCount++;
            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    //Delete Item from List
    deleteItem(key) {
        let deleteCount = false;
        const filteredItems = this.state.items.filter(function (item) {
            if (item.completed === true && item.key === key) {
                deleteCount = true;
            }
            return (item.key !== key);
        });

        if (deleteCount) {
            this.completedCount--;
        }
        this.itemCount--;
        this.setState({
            items: filteredItems
        });
    }

    //Complete Item on List
    completeItem(key) {
        let totalCompleted = 0;
        const filteredItems = this.state.items.filter(function (item) {
            if (item.key === key) {
                item.completed = !item.completed;
            }
            if (item.completed === true) {
                totalCompleted++;
            }
            return (item);
        });

        this.completedCount = totalCompleted;
        this.setState({
            items: filteredItems
        });
    }

    //Increase Priority of Item on List
    increasePriorityItem(key) {
        const filteredItems = this.state.items.filter(function (item) {
            if (item.key === key) {
                if (item.priority === "high") {
                    console.log("high match");
                    return item;
                } else if (item.priority === "medium") {
                    console.log("medium match");
                    item.priority = "high";
                    return item;
                } else if (item.priority === "low") {
                    console.log("low match");
                    item.priority = "medium";
                    return item;
                }
            }
            return (item);
        });

        this.setState({
            items: filteredItems
        });
    }

    //Decrease Priority of Item on List
    decreasePriorityItem(key) {
        const filteredItems = this.state.items.filter(function (item) {
            if (item.key === key) {
                if (item.priority === "high") {
                    console.log("high match");
                    item.priority = "medium";
                    return item;
                } else if (item.priority === "medium") {
                    console.log("medium match");
                    item.priority = "low";
                    return item;
                } else if (item.priority === "low") {
                    console.log("low match");
                    return item;
                }
            }
            return (item);
        });

        this.setState({
            items: filteredItems
        });
    }

    //Sort List by name or priority
    sortTasks(type) {
        if (type === "priority") {
            const priorityOrder = ["high", "medium", "low"];
            const sortedItems = this.state.items.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));

            this.setState({
                items: sortedItems
            });

        } else if (type === "name") {
            console.log("sort Name");
            const sortedItems = this.state.items.sort( (a, b) => {
                const textA = a.text;
                const textB = b.text;
                if (textA < textB) {
                    return -1;
                }
                if (textA > textB) {
                    return 1;
                }

                return 0;
            })

            this.setState({
                items: sortedItems
            });
        }

    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <section>
                        <h2>{`Items Completed / Items Count`}</h2>
                    </section>
                    <section>
                        <h2 data-cy="Todolist-counts">{`${this.completedCount} / ${this.itemCount}`}</h2>
                    </section>
                    <section>
                        <button data-cy="Todolist-sortPriority" onClick={() => this.sortTasks("priority")}>Priority</button>
                        <button data-cy="Todolist-sortName" onClick={() => this.sortTasks("name")}>Name</button>
                    </section>
                    <section>
                        <form onSubmit={this.addItem}>
                            <input data-cy="Todolist-textField" placeholder="enter task" ref={(a) => this._inputElement = a}>
                            </input>
                            <button data-cy="Todolist-submitButton" type="submit">add</button>
                        </form>
                    </section>
                </div>
                <TodoItems entries={this.state.items} delete={this.deleteItem} complete={this.completeItem}
                           increase={this.increasePriorityItem} decrease={this.decreasePriorityItem}/>
            </div>
        );
    }
}

export default TodoList;
