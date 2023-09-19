import { Cognito, StackContext } from "sst/constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();

export function Auth({ stack, app }: StackContext) {

	// Access the Google client ID using process.env
	const googleClientId = process.env.GOOGLE_CLIENT_ID;

	// Create a Cognito User Pool to manage auth
	// If you want to add phone login: ["email", "phone"]
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
		// triggers: {
    //   preAuthentication: "src/preAuthentication.main",
    //   postAuthentication: "src/postAuthentication.main",
    // },
		identityPoolFederation: {
			google: {
				clientId:googleClientId!
			}
		},
		cdk: {
			userPool: {
				mfa: cognito.Mfa.OPTIONAL,
				mfaSecondFactor: {
					sms: false,
					otp: true,
				},
			},
		},
  });

	return {
		auth
	}
}