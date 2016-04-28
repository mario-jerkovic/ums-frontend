import React from 'react'
import Spinner from './Spinner'
import PageLoader from './PageLoader'

/**
 * universal loader for app. includes:
 *  - block loader (simple spinner)
 *  - page loader (big loading screen)
 * @param isLoading - indicates if loading page must be shown
 * @param isPageLoader - whether the big loading screen must be shown 
 * @param children - components to render is isLoading=false
 * @param className 
 */
const Loader = ({isLoading, isPageLoader, children, className}) => {
  if (isLoading) {
    if (isPageLoader) {
      return <PageLoader className="sk-fading-circle--big"/>
    }
    return <Spinner/>
  } else {
    return <div className={className}>{children}</div>
  }
};

Loader.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  isPageLoader: React.PropTypes.bool
};

export default Loader