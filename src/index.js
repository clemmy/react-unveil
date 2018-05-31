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

    // setInterval(() => {
    //   this.setState({
    //     isDirty: true,
    //   });
    //   console.log('dirty');
    // }, 3000);
  }

  measure = () => {
    console.log('measure');
    this.setState({
      actualHeight: this.childrenWrapper.offsetHeight,
      actualLessHeight: this.lessWrapper.offsetHeight,
      isDirty: false,
    });
  };

  render() {
    console.log('render');
    console.log('actual height: ' + this.state.actualHeight);
    console.log('max height: ' + this.props.maxHeight);
    // nothing to be done if no children provided
    if (!this.props.children) {
      return null;
    }

    // invisible children for measurement
    const Invisible = (
      <div style={HIDDEN_STYLES}>
        <div ref={e => (this.childrenWrapper = e)}>{this.props.children}</div>
        <div ref={e => (this.lessWrapper = e)}>
          {this.props.less ? this.props.less()() : null}
        </div>
      </div>
    );

    const ShowLess = this.props.less ? this.props.less(this.collapse)() : null;
    const ShowMore = this.props.more ? this.props.more(this.expand)() : null;

    return (
      <div
        style={{
          ...WRAPPER_STYLES,
          height: this.state.expanded
            ? this.state.actualHeight + this.state.actualLessHeight
            : this.props.maxHeight,
          ...this.props.style,
        }}
      >
        {this.props.children}
        {this.state.actualHeight <= this.props.maxHeight
          ? null
          : this.state.expanded
            ? ShowLess
            : ShowMore}
        {this.state.isDirty ? Invisible : null}
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.isDirty) {
      this.measure();
    }
  }
}

export default Unveil;
