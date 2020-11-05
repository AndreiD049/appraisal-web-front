import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../../services/GlobalContext';

const AuthorizationComponent = ({ code, grant, onReject, ...props }) => {
  const global = useContext(GlobalContext);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    setAccess(global.Authorize(code, grant));
  }, [global, code, grant]);

  return ( access ? props.children : (onReject ? onReject() : null) );
};

export default AuthorizationComponent