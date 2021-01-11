import React from 'react';
import './basicLayout.less';

const BasicLayout = ({ navEle, footer, renderRoute }) => {
  debugger
  return (
    <div className="layouts">
      <div className="header">
        {navEle}
      </div>
      <div className="mainContent">
        {renderRoute()}
      </div>
      <div className="footer">{footer}</div>
    </div>
  )
}

export default BasicLayout;