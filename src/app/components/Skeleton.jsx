import React from 'react';

const Skeleton = ({ width, height, circle }) => {
  const skeletonStyle = {
    width: width,
    height: height,
    borderRadius: circle ? '50%' : '4px',
  };

  return <div className="skeleton-wave" style={skeletonStyle}></div>;
};

export default Skeleton;
