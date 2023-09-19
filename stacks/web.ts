import { NextjsSite, StackContext, use } from "sst/constructs";
import { Auth } from "./auth";
import { Lambda } from "./lambda";

export function Web({ stack, app }: StackContext) {
	const { auth } = use(Auth)
	const {lambda} = use(Lambda)

	console.log(auth.userPoolId);

	// docs: https://docs.serverless-stack.com/constructs/NextjsSite
  const nextFrontEnd = new NextjsSite(stack, 'web', {
		path: 'packages/web',
		memorySize: 1024,
    environment: {
			NEXT_PUBLIC_API_URL: lambda.url,
      NEXT_PUBLIC_REGION: stack.region,
			NEXT_PUBLIC_COGNITO_CLIENT_ID: auth.userPoolClientId,
      NEXT_PUBLIC_COGNITO_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId!
    }
	})
}