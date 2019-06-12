import React from 'react';
import Item from './Item';
import { observer, inject } from 'mobx-react';

@inject(stores => ({
  list: stores.todos.list,
  addTodo: stores.todos.addTodo
}))

@observer
export default class ItemList extends React.Component {

  _addItem = e => {
    this.props.addTodo(this._inputElement.value, 1);
    this._inputElement.value = '';
    this._inputElement.focus();
  }

  render() {
    const { list } = this.props;
    return (
      <div className="item-list">
        <div className="form">
          <input
            ref={(a) => this._inputElement = a}
            placeholder="Add new item"
            autoFocus
          />
          <button onClick={this._addItem} />
        </div>
        {
          list && list.map(item => {
            return (
              <Item
                item={item}
                text={item.name}
                status={item.status}
                key={item.id}
                onComplete={this.completeItem}
                onDelete={this.props.deleteItem}
                onPause={this.pauseItem}
              />
            );
          })
        }
      </div>
    );
  }
}