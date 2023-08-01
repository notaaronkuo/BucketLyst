import React, { useEffect, useState } from 'react';
/* global gapi */
//import './css/Hotbar.css';
//import './css/Login.css';

import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { Amplify, Auth, API } from 'aws-amplify';
import { Authenticator, useAuthenticator, useTheme, View, Text, Button, Heading, Image , CheckboxField} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Welcome back!
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Forgot your password?
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          {/* Re-use default `Authenticator.SignUp.FormFields` */}
          <Authenticator.SignUp.FormFields />

          {/* Append & require Terms & Conditions field to sign up  */}
          <CheckboxField
            errorMessage={validationErrors.acknowledgement}
            hasError={!!validationErrors.acknowledgement}
            name="acknowledgement"
            value="yes"
            label="I agree with the Terms & Conditions"
          />
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your username',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,

    },
    confirm_password: {
      label: 'Confirm Password:',

    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  resetPassword: {
    username: {
      placeholder: 'Enter your username:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};



function LoginApp({ setIsLoggedIn }) {
  return (
    <Authenticator.Provider>
      {/* Your app content */}
      <Loginn setIsLoggedIn={setIsLoggedIn}  />
    </Authenticator.Provider>
  );
}

function Loginn({ setIsLoggedIn })  {
  const navigate = useNavigate();
  
const handleClick3 = () => {
  console.log("test if this is called");
  navigate('/home');
}

const handleLogIn = () => {
  return new Promise((resolve, reject) => {
  console.log('set logged in');
  setIsLoggedIn(true);
  resolve();
});
}
async function waitForEmail() {
  while (user.attributes.email === null) {
    // Wait for a short duration
    await new Promise(resolve => setTimeout(resolve, 200)); // Adjust the duration as needed
    
    // Fetch the user again or update the user object if necessary
    // Example: user = await fetchUser();

    // Alternatively, you can use a state update to trigger a re-render and obtain the updated user object
    // Example: setUser(await fetchUser());
  }

  // Once the user.email is not null, proceed with the code here
  console.log("User email is not null:", user.attributes.email);
  // Rest of the code
}






const [userInfoLoaded, setUserInfoLoaded] = useState(false);
const { user } = useAuthenticator(); // Call the useAuthenticator hook directly in the component


useEffect(() => {
  function storedUserInfo(username, email) {
    return new Promise((resolve, reject) => {
      window.sessionStorage.setItem('username', username);
      window.sessionStorage.setItem('email', email);
      const storedUsername = sessionStorage.getItem('username');
      const storedEmail = sessionStorage.getItem('email');
      console.log("test if this is called");
      console.log("Email: " + storedEmail);
      console.log("User: " + storedUsername);

      resolve(); // Resolve the promise to indicate completion
    });
  }

  if (user) {
    try {
      if (user.attributes.email === undefined) {
        // Code to handle when user.attributes.email is undefined
        console.log("User email is undefined");
        
      waitForEmail();
      } else if (user.attributes.email === null) {
        // Code to handle when user.attributes.email is null
        console.log("User email is null");
        
      waitForEmail();
      }
       else {
        // Code to handle when user.attributes.email is defined and not null
        console.log("User email:", user.attributes.email);
        // Rest of the code
    storedUserInfo(user.username, user.attributes.email)
      .then(() => {
        handleLogIn().then(() => {
          // The code here will be executed after the handleLogIn function resolves
          console.log('Rest of the code executed after logging in');
          navigate('/home');
          setUserInfoLoaded(true);
          // Perform any additional actions or set up your component's initial state
        });
        
      });
    }
  } catch (error) {
    // Catch the error if accessing 'user.attributes' or 'user.attributes.email' throws an exception
    console.error("Error fr undefined object:", error.message);
  } }else {
      setUserInfoLoaded(true); // If there's no user, set the state to indicate that the user info loading is complete
    }
  
  }, [navigate, user]);

  return (
    
    <body>
      <div class="container">
        <div class="intro">
          <h1>Welcome to our community</h1>
          <p>
            Easily organize your favorite places into custom lists. Create your
            own personalized map of memories with Bucketlyst.
          </p>

          <div class="profile">
            <p className="stars">
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <span class="gold-star">&#9733;</span>
              <p className="quote-1">
                “Love Bucketlyst! Easy to save and organize favorite spots, and
                search and filter functions make it a breeze to find new places.
                Sharing lists is great too. Highly recommend!”
              </p>
            </p>
            <img
              class="profile-pic-1"
              src="https://i.ibb.co/wCkw8mv/Screen-Shot-2023-05-04-at-11-34-37-AM.png"
              alt="Profile Picture"
            ></img>
            <div class="profile-info">
              <h2 class="name-profile-pic">Devon Lane</h2>
              <p class="description">Co-Founder, BucketLyst</p>
            </div>
          </div>
        </div>
        <div class="login-container">
          {/*<h2 class="welcome">Welcome back!</h2>*/}
          {/*<button onClick={printUsernameFromLocalStorage}>Set username</button>
          <button onClick={handleLogout}>Remove from local storage</button>*/}
          <Authenticator formFields={formFields} components={components} services={{
        async validateCustomSignUp(formData) {
          if (!formData.acknowledgement) {
            return {
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
        },
      }}socialProviders={['facebook', 'google']} style=' --amplify-colors-background-primary: #f43f5e;'>
            {/*}
            {({ signOut, user }) => 
            <div> 
              {storedUserInfo(user.username, user.attributes.email)
  .then(() => navigate('/home'))}*/}
              {/*<button onClick={handleClick3}>Go Home Page</button>

              <div><p>I can't find where the button for the "Sign in" is for the frontend code to attach the navigation function to, so here's a button with the function that takes you to home page</p></div>              
              {/*<button onClick={signOut}>Sign out</button>*/}
            {/*</div>*/}
            
          </Authenticator>
          
          <div>
          {userInfoLoaded ? (
        // Render your component content here
        <p> </p>
      ) : (
        // Optionally, you can render a loading indicator or fallback content while the user info is being loaded
        <p>Loading user info...</p>
      )}
    </div>
   
        </div>
      </div>
    </body>

  );
}

export default LoginApp;