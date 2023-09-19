import { SSTConfig } from "sst";


export default {
  config(input) {
    return {
      name: "sst-cognito-auth-template",
      region: "us-east-1",
      profile: input.stage === "prod" ? "eitri-prod" : "eitri-dev",
    };
  },
  async stacks(app) {
    const appStacks = await import('./stacks');
    appStacks.default(app);
  }
} satisfies SSTConfig;
