import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultMore from './More.js';
import DefaultLess from './Less.js';

const HIDDEN_STYLES = {
  height: 0,
  overflow: 'hidden',
};

const WRAPPER_STYLES = {
  transition: '0.4s ease height',
  overflow: 'hidden',
  position: 'relative', // so that absolute positioning of More/Less components are relative to this
};

const UnveilPropTypes = {
  render: PropTypes.func, // render prop for the children to contain in the veil
  className: PropTypes.string, // className to apply on the unveil component
  style: PropTypes.object, // style to apply on wrapper
  maxHeight: PropTypes.number, // height of "veiled" container
  more: PropTypes.func, // render prop that receives a function "expand"
  less: PropTypes.func, // render prop that receives a function "collapse"
  onMoreClick: PropTypes.func, // callback when expanded
  onLessClick: PropTypes.func, // callback when collapsed
  expanded: PropTypes.bool, // whether or not to initially be expanded
};

class Unveil extends Component {
  static propTypes = UnveilPropTypes;

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
      invisibleHeight: 0, // measured height of invisible wrapper
      childrenHeight: 0, // measured height of the invisible children
      isDirty: true, // specifies whether measurement is needed
    };
  }

  expand = () => {
    this.setState(
      {
        isDirty: true, // corrects height on expand
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

    // TODO: find a better solution
    // currently this race helps to render it properly when the component is initially expanded
    this.timeoutId = setTimeout(this.markAsDirty, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  markAsDirty = () => {
    this.setState({
      isDirty: true,
    });
  };

  measure = () => {
    this.setState({
      invisibleHeight: this.invisible.scrollHeight,
      childrenHeight: this.childrenWrapper.scrollHeight,
      isDirty: false,
    });
  };

  render() {
    // nothing to be done if no render prop provided
    if (!this.props.render) {
      return null;
    }

    // invisible children for measurement
    const Invisible = (
      <div key="invisible" style={HIDDEN_STYLES}>
        <div ref={e => (this.invisible = e)}>
          <div ref={e => (this.childrenWrapper = e)}>
            {this.props.render(this.markAsDirty)}
          </div>
          {this.props.less ? this.props.less() : null}
        </div>
      </div>
    );

    const ShowLess = this.props.less ? this.props.less(this.collapse) : null;
    const ShowMore = this.props.more ? this.props.more(this.expand) : null;

    // array instead of fragment for backwards compatability
    return [
      <div
        key="unveil"
        style={{
          ...WRAPPER_STYLES,
          height: this.state.expanded
            ? this.state.invisibleHeight
            : this.props.maxHeight,
          ...this.props.style,
        }}
      >
        <div
          style={{
            height: this.state.childrenHeight,
          }}
        >
          {this.props.render(this.markAsDirty)}
        </div>
        {this.state.childrenHeight <= this.props.maxHeight
          ? null
          : this.state.expanded
            ? ShowLess
            : ShowMore}
      </div>,
      Invisible,
    ];
  }

  componentDidUpdate() {
    if (this.state.isDirty) {
      this.measure();
    }
  }
}

export default Unveil;
