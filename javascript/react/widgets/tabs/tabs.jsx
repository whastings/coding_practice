var Tabs = React.createClass({
  changeTab: function(index) {
    this.setState({active: index});
  },
  getInitialState: function() {
    return {active: 0};
  },
  render: function() {
    var items = this.props.items,
        activeIndex = this.state.active,
        activeItem = items[activeIndex];
    return (
      <div className="tabs">
        <TabsHeader items={items} active={activeIndex} onItemClick={this.changeTab}/>
        <div className="tabs__content">
          {activeItem.content}
        </div>
      </div>
    );
  }
});

var TabsHeader = React.createClass({
  render: function() {
    var items = this.props.items,
        activeIndex = this.props.active,
        onItemClick = this.props.onItemClick;
    return (
      <div className="tabs__header">
        <ul>
          {items.map(function(item, index) {
            return <TabsHeaderItem
                    title={item.title}
                    index={index}
                    onClick={onItemClick}
                    isActive={index === activeIndex}/>
          })}
        </ul>
      </div>
    );
  }
});

var TabsHeaderItem = React.createClass({
  onClick: function(event) {
    var index = this.props.index;
    event.preventDefault();
    this.props.onClick(index);
  },
  render: function() {
    var title = this.props.title,
        isActive = this.props.isActive;
    return (
      <li className={'tabs__header-item' + (isActive ? ' tabs__header-item--active' : '')}>
        <a href="#" onClick={this.onClick}>{title}</a>
      </li>
    );
  }
});
