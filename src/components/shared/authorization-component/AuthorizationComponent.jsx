import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../../services/GlobalContext';

const AuthorizationComponent = ({
  code, grant, onReject, ...props
}) => {
  const global = useContext(GlobalContext);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    setAccess(global.Authorize(code, grant));
  }, [global, code, grant]);

  if (access) {
    return props.children;
  } if (onReject) {
    return onReject();
  }
  return null;
};

export default AuthorizationComponent;
