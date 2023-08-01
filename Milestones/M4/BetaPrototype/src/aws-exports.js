/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cloud_logic_custom": [
        {
            "name": "follow",
            "endpoint": "https://rhapilvpba.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        },
        {
            "name": "home",
            "endpoint": "https://yik3sigrd3.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        },
        {
            "name": "makelist",
            "endpoint": "https://zvfl5bqam7.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        },
        {
            "name": "profile",
            "endpoint": "https://jgrkyfa983.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        },
        {
            "name": "scrape",
            "endpoint": "https://aftucvtn15.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        },
        {
            "name": "search",
            "endpoint": "https://wjyapent1i.execute-api.us-east-1.amazonaws.com/newdev",
            "region": "us-east-1"
        }
    ],
    "aws_cognito_identity_pool_id": "us-east-1:66808dcc-1ec2-44b2-8534-b14ecdc33870",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_u5UQcBQZc",
    "aws_user_pools_web_client_id": "453vtloaaa6mklv5m46qpasugn",
    "oauth": {
        "domain": "test-newdev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://master.d38dj1lszxpibn.amplifyapp.com/",
        "redirectSignOut": "https://master.d38dj1lszxpibn.amplifyapp.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [
        "FACEBOOK",
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS",
            "REQUIRES_UPPERCASE"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
