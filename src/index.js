import React from "react";
import ReactDOM from "react-dom";

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
      edit: false
    };
    this.Item = this.Item.bind(this);
    this.HandleTextChange = this.HandleTextChange.bind(this);
    this.ItemEdit = this.ItemEdit.bind(this);
    this.ItemUpdate = this.ItemUpdate.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.DeleteItem = this.DeleteItem.bind(this);
  }

  Item(e) {
    let emptyCheck = this.state.text;
    if (emptyCheck) {
      const newItem = {
        content: this.state.text
      };

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        text: ""
      }));
    } else {
      alert("Type task name");
    }
  }

  HandleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  ItemEdit(itemIndex) {
    var editItem = this.state.items[itemIndex];

    this.setState({
      text: editItem.content,
      edit: true,
      editId: itemIndex
    });
  }

  ItemUpdate() {
    var currentEdit = this.state.editId;
    var updateList = this.state.items.map((item, index) => {
      if (index !== currentEdit) {
        return item;
      }
      return { content: this.state.text };
    });
    this.setState({
      items: updateList,
      text: "",
      edit: false
    });
  }

  Cancel() {
    this.setState({
      text: "",
      edit: false
    });
  }

  DeleteItem(itemIndex) {
    var tempItems = this.state.items.slice();
    tempItems.splice(itemIndex, 1);
    this.setState({
      items: tempItems
    });
  }

  render() {
    const toDoList = this.state.items.map((item, index) => (
      <div key={index} className="alert alert-primary text-left">
        <span className="">{item.content}</span>
        <span className="">
          <input
            type="button"
            id="btn-edit"
            name="btn-edit"
            onClick={() => {
              this.ItemEdit(index);
            }}
            value="Edit"
            className="btn 
        btn-primary btn-sm float-right"
          />
          <input
            type="button"
            id="btn-delete"
            name="btn-delete"
            className="
            btn btn-danger btn-sm float-right"
            onClick={() => {
              this.DeleteItem(index);
            }}
            value="Delete"
          />
        </span>
        <div className="clear" />
      </div>
    ));

    return (
      <div className="col-sm-12">
        <h1 className="text-center">Task List</h1>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Task Name"
            onChange={this.HandleTextChange}
            name="todo-input-box"
            value={this.state.text}
            required="true"
          />
          <div className="input-group-append">
            {this.state.edit === false ? (
              <button
                className="btn 
              btn-outline-primary"
                type="button"
                onClick={this.Item}
              >
                Save
              </button>
            ) : (
              <input
                type="button"
                className="btn 
              btn-outline-success"
                name="btn-update"
                onClick={this.ItemUpdate}
                value="Update"
              />
            )}
            {this.state.edit === true && (
              <input
                type="button"
                className="btn 
              btn-outline-warning text-black"
                name="btn-cancel"
                onClick={this.Cancel}
                value="Cancel"
              />
            )}
          </div>
        </div>
        <br />

        <div className="">{toDoList}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDoApp />, rootElement);
