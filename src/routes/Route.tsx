import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouterProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import Page from './Page';

interface RouterProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  title?: string;
}

/**
 * Private Routes Boolean Logic:
 * isPrivate/IsSigned
 * true/true = OK
 * true/false = redirect to login
 * false/true = redirect to dashboard
 * false/true = OK
 */

const Route: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  title = 'AGF Bi',
  ...rest
}) => {
  const { logged } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        switch (isPrivate) {
          case !!logged:
            return (
              <Page title={title}>
                <Component />
              </Page>
            );
          case false:
            return (
              <Page title={title}>
                <Component />
              </Page>
            );
          default:
            return (
              <Redirect
                to={{
                  pathname: isPrivate ? '/' : `/menu`,
                  state: { from: location },
                }}
              />
            );
        }
      }}
    />
  );
};

export default Route;
