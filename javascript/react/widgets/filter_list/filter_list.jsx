/** @jsx React.DOM */

window.FilterList = React.createClass({
  getInitialState: function() {
    return {query: '', results: this.props.list};
  },
  onChange: function(event) {
    var newQuery = event.target.value,
        results = this.props.list;
    if (newQuery !== '') {
      results = results.filter(function(result) {
        return result.indexOf(newQuery) > -1;
      });
    }
    this.setState({query: newQuery, results: results});
  },
  render: function() {
    var results = this.state.results;
    return (
      <div className="filter_list">
        <label>
          Search:
          <input type="text" value={this.state.query} onChange={this.onChange}/>
        </label>

        <ul className="filter_list__list">
          {results.map(function(result, index) {
            return <li key={index}>{result}</li>
          })}
        </ul>
      </div>
    );
  }
});
