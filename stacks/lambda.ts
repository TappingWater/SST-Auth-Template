import { Api, StackContext, use } from "sst/constructs";
import { Auth } from "./auth";


// Create an HTTP API
export function Lambda({ stack, app }: StackContext) {
  const { auth } = use(Auth);
  
  // Define your API here
  const lambda = new Api(stack, 'api', {
    defaults: { function: { timeout: '10 seconds' } },
    routes: {
      "GET /public": "packages/functions/src/public.handler",
      "GET /private": {
        function: "packages/functions/src/private.handler",
        authorizer: "iam"
      },
    },
  });
  stack.addOutputs({
    Endpoints: lambda.url,
  });
  // Allow authenticated users to invoke the API
  auth.attachPermissionsForAuthUsers(stack, [lambda]);

  return {
		lambda
	}
}
