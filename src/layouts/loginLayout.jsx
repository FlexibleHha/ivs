import React from 'react';

const LoginLayout = ({ renderRoute }) => {
  return (
    <div className="login">
      {renderRoute()}
    </div>
  )
}

export default LoginLayout;