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

const UnveilPropTypes = {
  className: PropTypes.string, // TODO: double check if this is the right type
  style: PropTypes.object, // style to apply on wrapper
  maxHeight: PropTypes.number, // height of "veiled" container
  children: PropTypes.node,
  more: PropTypes.func, // render prop that receives a function "expand"
  less: PropTypes.func, // render prop that receives a function "collapse"
  onMoreClick: PropTypes.func, // callback when expanded
  onLessClick: PropTypes.func, // callback when collapsed
  expanded: PropTypes.bool, // whether or not to initially be expanded
  poll: PropTypes.bool, // whether or not to continuously check for children resizing, not recommended for production
};

class Unveil extends Component {
  static propTypes = UnveilPropTypes;

  static defaultProps = {
    maxHeight: 300,
    style: {},
    more: DefaultMore,
    less: DefaultLess,
    expanded: false,
    poll: false,
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
    console.log('mounted unveil');
    if (this.state.isDirty) {
      this.measure();
    }
  }

  markAsDirty = () => {
    console.log('marked as dirty');
    this.setState({
      isDirty: true,
    });
  };

  measure = () => {
    console.log('measure');
    console.log('invisible height: ' + this.invisible.scrollHeight);
    this.setState({
      actualHeight: this.invisible.scrollHeight,
      isDirty: false,
    });
  };

  render() {
    console.log('render unveil');
    console.log('actual children height: ' + this.state.actualHeight);
    console.log('max height: ' + this.props.maxHeight);
    // nothing to be done if no children provided
    if (!this.props.children) {
      return null;
    }

    // invisible children for measurement
    const Invisible = (
      <div id="invisible" ref={e => (this.invisible = e)} style={HIDDEN_STYLES}>
        <div>{this.props.children}</div>
        <div>{this.props.less ? this.props.less()() : null}</div>
      </div>
    );

    const ShowLess = this.props.less ? this.props.less(this.collapse)() : null;
    const ShowMore = this.props.more ? this.props.more(this.expand)() : null;

    return (
      <div
        id="unveil"
        style={{
          ...WRAPPER_STYLES,
          height: this.state.expanded
            ? this.state.actualHeight
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
        {this.state.isDirty ? Invisible : Invisible}
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.isDirty) {
      this.measure();
    }
  }
}

class AsyncUnveil extends Component {
  static propTypes = UnveilPropTypes;

  constructor(props) {
    super(props);

    this.unveilRef = {};
  }

  componentDidMount() {
    console.log('mounted asyncunveil');
    if (this.props.poll) {
      this.pollId = setInterval(() => {
        this.setState({
          isDirty: true,
        });
      }, 100);
    }

    this.forceUpdate(); // re-render after ref is populated
  }

  render() {
    console.log('render async unveil');
    console.log(this.props);
    return (
      <Unveil ref={e => (this.unveilRef.ref = e)} {...this.props}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            notifyResize: this.unveilRef.ref
              ? this.unveilRef.ref.markAsDirty
              : undefined,
          })
        )}
      </Unveil>
    );
  }

  componentWillUnmount() {
    if (this.props.poll) {
      clearInterval(this.pollId);
    }
  }
}

export { AsyncUnveil, Unveil };
