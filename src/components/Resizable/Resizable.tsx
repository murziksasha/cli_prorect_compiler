import { ResizableBox } from 'react-resizable';
import './Resizable.css';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function Resizable({children}: IProps) {
  return <ResizableBox 
    height={300}
    width={900}
    resizeHandles={['s']}
    maxConstraints={[Infinity, window.innerHeight * 0.9]}
    minConstraints={[Infinity, 100]}
  >{children}</ResizableBox>;
}

export default Resizable