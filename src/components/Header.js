import React from 'react';
import { connect } from 'react-redux';
import store from '../store/weatherStore';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <p className="header__location">{this.props.state.locationName}</p>
        <p className="header__date">{`${this.props.state.date.month}月${this.props.state.date.day}日`}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {return {state: state}};

export default connect(mapStateToProps)(Header);