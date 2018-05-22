import React from 'react';

const SHOW_MORE_STYLES = {
  cursor: 'pointer',
  background: 'white',
  width: '100%',
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CARET_UP_STYLES = {
  display: 'block',
  height: 6,
  width: 6,
  border: '2px solid #7c7c7c',
  borderBottom: 0,
  borderLeft: 0,
  transform: 'rotate(-45deg)',
  marginTop: 2,
  marginLeft: 6,
};

const TEXT_STYLES = {};

export default collapse => () => (
  <div onClick={collapse} style={SHOW_MORE_STYLES}>
    <span style={TEXT_STYLES}>Show Less</span>
    <span style={CARET_UP_STYLES} />
  </div>
);
