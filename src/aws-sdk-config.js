import AWS from 'aws-sdk';

// Update AWS SDK Configuration
AWS.config.update({
  region: 'ap-southeast-2', // Your AWS project region
});

// Amazon Cognito Configuration for AWS SDK
const cognitoConfig = {
  IdentityPoolId: 'ap-southeast-2:3ca33ab4-9cfc-4d33-bc11-7efe2a9a043b',
  region: 'ap-southeast-2'
};

// Optional: Setup Amazon Cognito Credentials
AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoConfig);

const awsmobile = {
    aws_project_region: "ap-southeast-2",
    aws_appsync_graphqlEndpoint: "https://bp4rqzb7jbaangbqobaehckyp4.appsync-api.ap-southeast-2.amazonaws.com/graphql",
    aws_appsync_region: "ap-southeast-2",
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    aws_cognito_identity_pool_id: "ap-southeast-2:3ca33ab4-9cfc-4d33-bc11-7efe2a9a043b",
    aws_cognito_region: "ap-southeast-2",
    aws_user_pools_id: "ap-southeast-2_0wqUd3kfb",
    aws_user_pools_web_client_id: "4q6pfa9spvfhldisphcuukrmvs",
    oauth: {},
    aws_cognito_username_attributes: [],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: [
        "EMAIL",
        "FAMILY_NAME",
        "GIVEN_NAME",
        "PHONE_NUMBER"
    ],
    aws_cognito_mfa_configuration: "OPTIONAL",
    aws_cognito_mfa_types: [
        "SMS",
        "TOTP"
    ],
    aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS"
        ]
    },
    aws_cognito_verification_mechanisms: [
        "EMAIL"
    ]
};

export { AWS, awsmobile };