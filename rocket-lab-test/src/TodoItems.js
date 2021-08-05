import React, { Component } from "react";
import { RiDeleteBinFill, RiArrowUpCircleFill, RiArrowDownCircleFill, RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri';


class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.tasks = this.tasks.bind(this);
        this.complete = this.complete.bind(this);
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    complete(key) {
        this.props.complete(key);
    }

    increase(key) {
        this.props.increase(key);
    }

    decrease(key) {
        this.props.decrease(key);
    }

    tasks(item) {

    let backgroundColor = "#0066FF";
        if (item.priority === "high") {
            backgroundColor = "#d91b1b";
        } else if(item.priority === "medium") {
            backgroundColor = "#0066FF";
        } else if(item.priority === "low") {
            backgroundColor = "#80ff00";
        }

        return (
            <li style={{backgroundColor: backgroundColor}} data-cy={`Item ${item.text}`}>
                <section>
                    <div style={{alignItems: 'center'}}>
                        {item.completed === true ? <RiCheckboxFill data-cy={`Completed ${item.text}`} size={30} onClick={() => this.complete(item.key)}/> : <RiCheckboxBlankLine data-cy={`Not-Completed ${item.text}`} size={30} onClick={() => this.complete(item.key)}/>}
                    </div>
                    <text>{item.text}</text>
                </section>
                <section>
                    <div>
                        <RiDeleteBinFill data-cy={`Delete ${item.text}`} size={30} onClick={() => this.delete(item.key)}/>
                        <RiArrowUpCircleFill data-cy={`Increase ${item.text}`} size={30} onClick={() => this.increase(item.key)}/>
                        <RiArrowDownCircleFill data-cy={`Decrease ${item.text}`} size={30} onClick={() => this.decrease(item.key)}/>
                    </div>
                </section>
            </li>
        )
    }

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.tasks);

        return (
                <ol data-cy="The List" style={{justifyContent: 'space-between'}} className="theList">
                    {listItems}
                </ol>
        );
    }
}

export default TodoItems;
