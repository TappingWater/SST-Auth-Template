import * as sst from 'sst/constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Auth } from './auth';
import { Web } from './web';
import { Lambda } from './lambda';

// deal with dynamic imports of node built-ins (e.g. "crypto")
// from https://github.com/evanw/esbuild/pull/2067#issuecomment-1073039746
// and hardcode __dirname for https://github.com/prisma/prisma/issues/14484
export const ESM_REQUIRE_SHIM = `await(async()=>{let{dirname:e}=await import("path"),{fileURLToPath:i}=await import("url");if(typeof globalThis.__filename>"u"&&(globalThis.__filename=i(import.meta.url)),typeof globalThis.__dirname>"u"&&(globalThis.__dirname='/var/task'),typeof globalThis.require>"u"){let{default:a}=await import("module");globalThis.require=a.createRequire(import.meta.url)}})();`;

export const RUNTIME = Runtime.NODEJS_18_X;

export default function main(app: sst.App) {
  app.setDefaultFunctionProps({
		runtime: 'nodejs18.x',

    // N.B. bundle settings are defined in Layers
  });

  app
    .stack(Auth)
    .stack(Lambda)
    .stack(Web);
}