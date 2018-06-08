import React from 'react';

const SHOW_MORE_STYLES = {
  cursor: 'pointer',
  background: 'linear-gradient( to top, white, rgba(255, 255, 255, 0) )', // can't use 'transparent' since Safari interpolates that as 'transparent black'
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CARET_DOWN_STYLES = {
  display: 'block',
  height: 6,
  width: 6,
  border: '2px solid #7c7c7c',
  borderBottom: 0,
  borderLeft: 0,
  transform: 'rotate(135deg)',
  marginLeft: 6,
};

const TEXT_STYLES = {};

export default expand => () => (
  <div onClick={expand} style={SHOW_MORE_STYLES}>
    <span style={TEXT_STYLES}>Read More</span>
    <span style={CARET_DOWN_STYLES} />
  </div>
);
