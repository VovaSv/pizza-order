import { ReactNode, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P): ReactNode => {
        const jwt = localStorage.getItem('jwt');

        // Check if JWT exists
        if (!jwt) {
            // Redirect to login if JWT is not present
            return <Navigate to="/auth/login" replace={true} />;
        }

        // Render the wrapped component with passed props if authenticated
        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;