import React from 'react';

class OrgNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: props.defaultValue,
    };
  }

  handleChange = (event) => {
    this.setState({ orgName: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.orgName);
  }

  render() {
    const { orgName } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="org-name-input">Organization Name:</label>
        </div>
        <div>
          <input id="org-name-input" onChange={this.handleChange} value={orgName} />
        </div>
        <div>
          <button type="submit">Change Organization</button>
        </div>
      </form>
    )
  }
}

export default OrgNameForm;
