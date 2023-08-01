import React, { useState } from "react";

import "../css/Login.css";
import { Link } from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator, useAuthenticator, useTheme, View, Text, Button, Heading, Image, CheckboxField} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

function Membership() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      // Handle form submission
    }
  };
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
  
    
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Join BucketLyst!
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
            Already have an account? <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Sign in here!
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
  };
  
  const formFields = {
    
   signUp: {
      password: {
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter your Password:',
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

  };

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
        <div className="join-container">
        <Authenticator formFields={formFields} components={components} socialProviders={['facebook', 'google']} services={{
        async validateCustomSignUp(formData) {
          if (!formData.acknowledgement) {
            return {
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
        },
      }} initialState="signUp" style=' --amplify-colors-background-primary: #f43f5e;'>
            {({ signOut }) => <button onClick={signOut}>Sign out</button>}
          </Authenticator>
          
        </div>
      </div>
    </body>
  );
}

export default Membership;