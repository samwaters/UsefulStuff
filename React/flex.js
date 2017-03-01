import React, {PropTypes} from 'react';
const FlexContainer = (props) => {
    return <div style={{display:'flex', flexDirection:props.direction}}>{props.children}</div>
};
FlexContainer.propTypes = {
    direction: PropTypes.string.isRequired
};

const FlexItem = (props) => {
    return <div style={{flex:props.width}}>{props.children}</div>
};
FlexItem.propTypes = {
    width: PropTypes.string.isRequired
};
export {FlexContainer, FlexItem};