Hi, I'm trying to fix my Fly.io deployment. There's a build error on my Dockerfile.

Please fix my Dockerfile for me to the best of your ability. And give me the updated version so I can paste in Fly.io web deployment UI.

Error logs:

```
flyctl deploy --build-only --push -a university-transportation-management-system --image-label deployment-c53883f5b6ee48a9393c15f95caebbf3 --config fly.toml
==> Verifying app config
Validating fly.toml
[32m✓[0m Configuration is valid
--> Verified app config
==> Building image
Waiting for depot builder...

==> Building image with Depot
--> build:  (​)
#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 810B 0.0s done
#1 DONE 0.0s

#2 [internal] load metadata for docker.io/library/node:20-alpine
#2 ...

#3 [internal] load metadata for docker.io/library/nginx:alpine
#3 DONE 0.6s

#2 [internal] load metadata for docker.io/library/node:20-alpine
#2 DONE 0.8s

#4 [internal] load .dockerignore
#4 transferring context: 629B done
#4 DONE 0.0s

#5 [build 1/6] FROM docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2
#5 resolve docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2 done
#5 DONE 0.1s

#6 [internal] load build context
#6 transferring context: 852.26kB 0.1s done
#6 DONE 0.1s

#7 [stage-1 1/3] FROM docker.io/library/nginx:alpine@sha256:052b75ab72f690f33debaa51c7e08d9b969a0447a133eb2b99cc905d9188cb2b
#7 resolve docker.io/library/nginx:alpine@sha256:052b75ab72f690f33debaa51c7e08d9b969a0447a133eb2b99cc905d9188cb2b done
#7 DONE 0.1s

#5 [build 1/6] FROM docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2
#5 sha256:014e56e613968f73cce0858124ca5fbc601d7888099969a4eea69f31dcd71a53 3.86MB / 3.86MB 0.0s done
#5 sha256:6ac8cc1f0b52065d2132d052abc59bf19e19ac0c65729d4300ab41db30fed855 446B / 446B 0.0s done
#5 extracting sha256:014e56e613968f73cce0858124ca5fbc601d7888099969a4eea69f31dcd71a53
#5 sha256:34226f5414967f183a8ba2d2a0bf2809b3864182e8f68c07c066fa83f025024a 1.26MB / 1.26MB 0.1s done
#5 sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645 4.19MB / 42.78MB 0.2s
#5 extracting sha256:014e56e613968f73cce0858124ca5fbc601d7888099969a4eea69f31dcd71a53 0.2s done
#5 sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645 14.68MB / 42.78MB 0.3s
#5 sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645 30.41MB / 42.78MB 0.5s
#5 sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645 42.78MB / 42.78MB 0.6s done
#5 extracting sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645
#5 ...

#7 [stage-1 1/3] FROM docker.io/library/nginx:alpine@sha256:052b75ab72f690f33debaa51c7e08d9b969a0447a133eb2b99cc905d9188cb2b
#7 sha256:fc13532503d72b70e7dd276ae52f2743b14326b83c31935c86d7477c66019dea 1.40kB / 1.40kB 0.1s done
#7 sha256:ad5b65da02cfbd43daa87443b87051f3816a10eb7719938d8cb9a96ee828d471 1.21kB / 1.21kB 0.1s done
#7 sha256:136bc6976c2023e3363e66b88167d08019fece3e756c162c58754e3819bf4063 17.26MB / 17.26MB 0.2s done
#7 sha256:abdece946203a31d986f184559f417a33c3a8936a80153b2f0ffa208af4a0d48 954B / 954B 0.1s done
#7 sha256:51c30493937c33bd8b568d8aed09d9596f558d08877b05a5e1855516aba05e1f 403B / 403B 0.1s done
#7 sha256:5d2cc344426d3d91200b457a771ecfe976de824e165506f5cce5d6b863da1ca9 629B / 629B 0.1s done
#7 sha256:dfad290a5c259f8d1ec1938529f8ef602e335a26680497ad56d38e0727e1a10a 1.86MB / 1.86MB 0.2s done
#7 extracting sha256:dfad290a5c259f8d1ec1938529f8ef602e335a26680497ad56d38e0727e1a10a 0.2s done
#7 extracting sha256:5d2cc344426d3d91200b457a771ecfe976de824e165506f5cce5d6b863da1ca9 done
#7 extracting sha256:abdece946203a31d986f184559f417a33c3a8936a80153b2f0ffa208af4a0d48 done
#7 extracting sha256:51c30493937c33bd8b568d8aed09d9596f558d08877b05a5e1855516aba05e1f done
#7 extracting sha256:ad5b65da02cfbd43daa87443b87051f3816a10eb7719938d8cb9a96ee828d471 done
#7 extracting sha256:fc13532503d72b70e7dd276ae52f2743b14326b83c31935c86d7477c66019dea 0.0s done
#7 extracting sha256:136bc6976c2023e3363e66b88167d08019fece3e756c162c58754e3819bf4063 0.4s done
#7 DONE 1.0s

#5 [build 1/6] FROM docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2
#5 extracting sha256:d28ab52fe4290429b930e8fa368da4da8a7e63cf143c38f9b869950a67c32645 1.4s done
#5 DONE 2.0s

#5 [build 1/6] FROM docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2
#5 extracting sha256:34226f5414967f183a8ba2d2a0bf2809b3864182e8f68c07c066fa83f025024a 0.0s done
#5 extracting sha256:6ac8cc1f0b52065d2132d052abc59bf19e19ac0c65729d4300ab41db30fed855 done
#5 DONE 2.1s

#8 [build 2/6] WORKDIR /app
#8 DONE 1.4s

#9 [build 3/6] COPY package*.json ./
#9 DONE 0.0s

#10 [build 4/6] RUN npm install
#10 4.224 npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
#10 4.942 npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
#10 4.981 npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
#10 19.02 
#10 19.02 added 705 packages, and audited 706 packages in 19s
#10 19.02 
#10 19.02 145 packages are looking for funding
#10 19.02   run `npm fund` for details
#10 19.15 
#10 19.15 15 vulnerabilities (5 low, 2 moderate, 8 high)
#10 19.15 
#10 19.15 To address all issues, run:
#10 19.15   npm audit fix
#10 19.15 
#10 19.15 Run `npm audit` for details.
#10 19.15 npm notice
#10 19.15 npm notice New major version of npm available! 10.8.2 -> 11.7.0
#10 19.15 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.7.0
#10 19.15 npm notice To update run: npm install -g npm@11.7.0
#10 19.15 npm notice
#10 DONE 19.7s

#11 [build 5/6] COPY . .
#11 DONE 0.4s

#12 [build 6/6] RUN npm run build
#12 0.316 
#12 0.316 > unipass-manager@0.0.0 build
#12 0.316 > ng build
#12 0.316 
#12 1.189 ❯ Building...
#12 11.17 ✔ Building...
#12 11.17 Initial chunk files   | Names         |  Raw size | Estimated transfer size
#12 11.17 main-NF7BZSDV.js      | main          | 585.02 kB |               137.32 kB
#12 11.17 styles-XKNZUUXL.css   | styles        |  41.17 kB |                 4.65 kB
#12 11.17 polyfills-B6TNHZQ6.js | polyfills     |  34.58 kB |                11.32 kB
#12 11.17 
#12 11.17                       | Initial total | 660.77 kB |               153.29 kB
#12 11.17 
#12 11.17 Application bundle generation failed. [9.986 seconds]
#12 11.17 
#12 11.18 ▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 160.77 kB with a total of 660.77 kB.
#12 11.18 
#12 11.18 
#12 11.18 ▲ [WARNING] src/app/inicio/inicio.css exceeded maximum budget. Budget 4.00 kB was not met by 1.03 kB with a total of 5.03 kB.
#12 11.18 
#12 11.18 
#12 11.18 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 1.69 kB with a total of 5.68 kB.
#12 11.18 
#12 11.18 
#12 11.18 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 5.96 kB with a total of 9.96 kB.
#12 11.18 
#12 11.18 
#12 11.18 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 4.30 kB with a total of 8.30 kB.
#12 11.18 
#12 11.18 
#12 11.18 ▲ [WARNING] Module 'leaflet' used by 'src/app/pages/gerenciamento/gerenciamento-rotas/gerenciamento-rotas.ts' is not ESM
#12 11.18 
#12 11.18   CommonJS or AMD dependencies can cause optimization bailouts.
#12 11.18   For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
#12 11.18 
#12 11.18 
#12 11.18 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 1.96 kB with a total of 9.96 kB.
#12 11.18 
#12 11.18 
#12 11.18 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 299 bytes with a total of 8.30 kB.
#12 11.18 
#12 11.18 
#12 ERROR: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
npm run build failed
------
 > [build 6/6] RUN npm run build:
11.18   CommonJS or AMD dependencies can cause optimization bailouts.
11.18   For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
11.18 
11.18 
11.18 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 1.96 kB with a total of 9.96 kB.
11.18 
11.18 
11.18 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 299 bytes with a total of 8.30 kB.
11.18 
11.18 
------
==> Building image
Waiting for depot builder...

==> Building image with Depot
--> build:  (​)
#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 810B 0.0s done
#1 DONE 0.0s

#2 [internal] load metadata for docker.io/library/node:20-alpine
#2 DONE 0.2s

#3 [internal] load metadata for docker.io/library/nginx:alpine
#3 DONE 0.2s

#4 [internal] load .dockerignore
#4 transferring context: 629B 0.0s done
#4 DONE 0.0s

#5 [stage-1 1/3] FROM docker.io/library/nginx:alpine@sha256:052b75ab72f690f33debaa51c7e08d9b969a0447a133eb2b99cc905d9188cb2b
#5 resolve docker.io/library/nginx:alpine@sha256:052b75ab72f690f33debaa51c7e08d9b969a0447a133eb2b99cc905d9188cb2b done
#5 CACHED

#6 [build 1/6] FROM docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2
#6 resolve docker.io/library/node:20-alpine@sha256:643e7036aa985317ebfee460005e322aa550c6b6883000d01daefb58689a58e2 0.0s done
#6 DONE 0.0s

#7 [internal] load build context
#7 transferring context: 5.60kB 0.0s done
#7 DONE 0.0s

#8 [build 2/6] WORKDIR /app
#8 CACHED

#9 [build 3/6] COPY package*.json ./
#9 CACHED

#10 [build 4/6] RUN npm install
#10 CACHED

#11 [build 5/6] COPY . .
#11 CACHED

#12 [build 6/6] RUN npm run build
#12 0.361 
#12 0.361 > unipass-manager@0.0.0 build
#12 0.361 > ng build
#12 0.361 
#12 1.224 ❯ Building...
#12 10.76 ✔ Building...
#12 10.76 Initial chunk files   | Names         |  Raw size | Estimated transfer size
#12 10.76 main-NF7BZSDV.js      | main          | 585.02 kB |               137.32 kB
#12 10.76 styles-XKNZUUXL.css   | styles        |  41.17 kB |                 4.65 kB
#12 10.76 polyfills-B6TNHZQ6.js | polyfills     |  34.58 kB |                11.32 kB
#12 10.76 
#12 10.76                       | Initial total | 660.77 kB |               153.29 kB
#12 10.76 
#12 10.76 Application bundle generation failed. [9.536 seconds]
#12 10.76 
#12 10.77 ▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 160.77 kB with a total of 660.77 kB.
#12 10.77 
#12 10.77 
#12 10.77 ▲ [WARNING] src/app/inicio/inicio.css exceeded maximum budget. Budget 4.00 kB was not met by 1.03 kB with a total of 5.03 kB.
#12 10.77 
#12 10.77 
#12 10.77 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 1.69 kB with a total of 5.68 kB.
#12 10.77 
#12 10.77 
#12 10.77 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 5.96 kB with a total of 9.96 kB.
#12 10.77 
#12 10.77 
#12 10.77 ▲ [WARNING] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 4.00 kB was not met by 4.30 kB with a total of 8.30 kB.
#12 10.77 
#12 10.77 
#12 10.77 ▲ [WARNING] Module 'leaflet' used by 'src/app/pages/gerenciamento/gerenciamento-rotas/gerenciamento-rotas.ts' is not ESM
#12 10.77 
#12 10.77   CommonJS or AMD dependencies can cause optimization bailouts.
#12 10.77   For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
#12 10.77 
#12 10.77 
#12 10.77 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 1.96 kB with a total of 9.96 kB.
#12 10.77 
#12 10.77 
#12 10.77 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 299 bytes with a total of 8.30 kB.
#12 10.77 
#12 10.77 
#12 ERROR: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
npm run build failed
------
 > [build 6/6] RUN npm run build:
10.77   CommonJS or AMD dependencies can cause optimization bailouts.
10.77   For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
10.77 
10.77 
10.77 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 1.96 kB with a total of 9.96 kB.
10.77 
10.77 
10.77 ✘ [ERROR] src/app/pages/solicitacoes-estudantis/solicitacoes-estudantis.css exceeded maximum budget. Budget 8.00 kB was not met by 299 bytes with a total of 8.30 kB.
10.77 
10.77 
------
Error: failed to fetch an image or build from source: error building: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
npm run build failed
unsuccessful command 'flyctl deploy --build-only --push -a university-transportation-management-system --image-label deployment-c53883f5b6ee48a9393c15f95caebbf3 --config fly.toml'
```

Dockerfile


```

```

