import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultMore from './More.js';
import DefaultLess from './Less.js';

const HIDDEN_STYLES = {
  height: 0,
  overflow: 'hidden',
};

const WRAPPER_STYLES = {
  // transition: '0.4s ease all', // TODO: ensure this style doesn't apply when state is going from dirty -> not dirty
  overflow: 'hidden',
  position: 'relative', // so that absolute positioning of More/Less components are relative to this
};

const EXPANDED_STYLES = {
  // height: 'auto',
  // height: 500,
  // height: 'fit-content',
};

class Unveil extends Component {
  static propTypes = {
    className: PropTypes.string, // TODO: double check if this is the right type
    style: PropTypes.object, // style to apply on wrapper
    maxHeight: PropTypes.number, // height of "veiled" container
    children: PropTypes.node,
    more: PropTypes.func, // render prop that receives a function "expand"
    less: PropTypes.func, // render prop that receives a function "collapse"
    onMoreClick: PropTypes.func, // callback when expanded
    onLessClick: PropTypes.func, // callback when collapsed
    expanded: PropTypes.bool, // whether or not to initially be expanded
  };

  static defaultProps = {
    maxHeight: 300,
    style: {},
    more: DefaultMore,
    less: DefaultLess,
    expanded: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.expanded,
      actualHeight: 0, // real height of the children
      actualLessHeight: 0, // real height of the less button
      isDirty: true, // specifies whether measurement is needed
    };
  }

  expand = () => {
    this.setState(
      {
        expanded: true,
      },
      () => {
        if (this.props.onMoreClick) {
          this.props.onMoreClick();
        }
      }
    );
  };

  collapse = () => {
    this.setState(
      {
        expanded: false,
      },
      () => {
        if (this.props.onLessClick) {
          this.props.onLessClick();
        }
      }
    );
  };

  componentDidMount() {
    if (this.state.isDirty) {
      this.measure();
    }
  }

  measure = () => {
    this.setState({
      // actualHeight: this.childrenWrapper.clientHeight,
      // actualLessHeight: this.lessWrapper.clientHeight,
      actualHeight: this.childrenWrapper.offsetHeight,
      actualLessHeight: this.lessWrapper.offsetHeight,
      isDirty: false,
    });
  };

  render() {
    console.log('render');
    // nothing to be done if no children specified
    if (!this.props.children) {
      return null;
    }

    // render invisible children for measurement
    if (this.state.isDirty) {
      return (
        <div style={HIDDEN_STYLES}>
          <div ref={e => (this.childrenWrapper = e)}>{this.props.children}</div>
          <div ref={e => (this.lessWrapper = e)}>
            {this.props.less ? this.props.less()() : null}
          </div>
        </div>
      );
    }

    // nothing to be done if children doesn't surpass maxHeight
    if (this.state.actualHeight <= this.props.maxHeight) {
      return this.props.children;
    }

    if (this.state.expanded) {
      console.log(this.state);
      return (
        <div
          style={{
            ...WRAPPER_STYLES,
            ...EXPANDED_STYLES,
            height: this.state.actualHeight + this.state.actualLessHeight, // should i account for both heights in this div...? maybe just move less out, no need to measure
            // height: 'auto',
            ...this.props.style,
          }}
        >
          {this.props.children}
          {this.props.less ? this.props.less(this.collapse)() : null}
        </div>
      );
    } else {
      return (
        <div
          style={{
            ...WRAPPER_STYLES,
            height: this.props.maxHeight,
            ...this.props.style,
          }}
        >
          {this.props.children}
          {this.props.more ? this.props.more(this.expand)() : null}
        </div>
      );
    }
  }

  componentDidUpdate() {
    if (this.state.isDirty) {
      this.measure();
    }
  }
}

export default Unveil;
