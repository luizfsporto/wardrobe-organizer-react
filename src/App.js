import React, { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FilterBase from './FilterBase.js';
import './App.css'
import Spinner from 'react-bootstrap/Spinner';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// FirebaseUI config
const uiConfig = {
  // Different sign in methods
  signInOptions: [
    {
      // Email sign up
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    // Google log in
     firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Page won't show the account chooser
  credentialHelper: 'none',
  // Use a popup instead of redirecting to an external sign-up method (e.g. Google)
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

function App(props) {

  // Initially, there's no error message related to log in
  const [errorMessage, setErrorMessage] = useState(undefined);
  // Initially, there is no user logged in
  const [user, setUser] = useState(undefined);
  // Initially, shows spinner (webpage loading)
  const [isLoading, setIsLoading] = useState(true);

  // Auth state listener
  useEffect(() => {
    // listening changes in the auth state
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false); // Stops loading
      } else {
        setUser(null);
        setIsLoading(false);
      }
    })
    // When done loading
    return function cleanUp() {
      // Unregister the user
      authUnregisterFunction()
        .catch(function(error) {
          console.log(error);
      });
    }
  }, []) // Only run this hook on the first load

  // A callback function for logging out the current user
   const handleSignOut = () => {
     // Clear any previous errors
     setErrorMessage(null);
     firebase.auth().signOut()
      .catch(err => console.log(err)); // Catch errors with signing out
   }

   // Shows a spinner if website is loading
   // if(isLoading) {
   //   return (
   //     <Spinner animation="border" variant="info" role="status">
   //       <span className="sr-only">Loading...</span>
   //     </Spinner>
   //   );
   // }

  // Content to render at the start of the page
  let content = '';

  // If user is null (not logged in), give them the sign up/in option
  if(!user) {
    content = (
      <div className="container">
       <h1>Sign up</h1>
       {/* Sign in form */}
       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  // If user is logged in, give them the log out option
  } else {
    content = (
      <div className="container">
       <h2>Welcome, {user.displayName}!</h2>
        <button className="btn btn-warning" onClick={handleSignOut}>
          Log out
        </button>
      </div>
    );
  }


  // Filter component
  const [filter, setFilter] = useState(true);

  const handleClickFilter = () => {
    setFilter(true);
  }

  let mainBase = '';
  if (filter) {
    // Renders the Filter functionality
    mainBase = <FilterBase />;
  }


  // Renders the web application
  return (
    <div>
      <div className="container">
      <header id="header" className="jumbotron jumbotron-fluid bg-info text-dark">
        <div className="view">
          <h1 className="text-center">
            <Link to="/" onClick={handleClickFilter}
              style={{textDecoration: 'none'}}>How to Dress?
            </Link>
          </h1>
            <div className="typingIt">
              <p className="lead text-center">
                What do you want to add to your cart today?
              </p>
            </div>

            <div>
              {errorMessage &&
                <p className="alert alert-danger">{errorMessage}</p>
              }
              {/* User sign up / log in */}
              {content}
            </div>

            <div className="navbar-container">
              <nav className="navbar navbar-expand navbar-dark">
                <div className="navbar-nav">
                  <Switch>
                    <Route path="#closet">
                      {handleClickFilter}
                    </Route>
                  </Switch>
                  {/* Either clicking on this tab or inputting the url
                    redirect to the closet page */}
                  <Link to="/#closet" className="contactus additional" onClick={handleClickFilter}>Filter My Closet</Link>
                </div>
              </nav>
            </div>
          </div>
      </header>
    </div>

    <div>
      {mainBase};
    </div>
  </div>
  );
}


export default App;
