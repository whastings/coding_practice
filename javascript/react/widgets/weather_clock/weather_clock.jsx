window.WeatherClock = React.createClass({
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = position.coords;
      this.setState({lat: coords.latitude, long: coords.longitude});
      this._loadTemp();
    }.bind(this));
  },
  getInitialState: function() {
    return {lat: null, long: null, temp: null};
  },
  render: function() {
    var temp = this.state.temp;
    temp = temp === null ? 'Loading...' : temp;
    return (
      <div className="weather-clock">
        <strong>Temperature:</strong> {temp}
        <Clock/>
      </div>
    );
  },
  _loadTemp: function() {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial',
        lat = this.state.lat,
        long = this.state.long,
        request = new XMLHttpRequest(),
        url = apiUrl + '&lat=' + lat + '&lon=' + long;
    request.open('GET', url);
    request.send();
    request.addEventListener('load', this._setTemp);
  },
  _setTemp: function(event) {
    var data = JSON.parse(event.target.responseText);
    this.setState({temp: data.main.temp});
  }
});

window.Clock = React.createClass({
  componentDidMount: function() {
    this.timerId = window.setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    window.clearInterval(this.timerId);
  },
  getInitialState: function() {
    return this._getTimeData();
  },
  render: function() {
    var data = this.state;
    return (
      <div className="clock">
        <strong>Time:</strong> {data.hours}:{data.minutes}:{data.seconds}
      </div>
    );
  },
  tick: function() {
    this.setState(this._getTimeData());
  },
  _getTimeData: function() {
    var date = new Date(),
        hours = date.getHours() + 1,
        minutes = date.getMinutes() + 1,
        seconds = date.getSeconds() + 1;
    return {hours: hours, minutes: minutes, seconds: seconds};
  }
});
