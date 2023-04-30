# History

## Steps followed

- Install Nest CLI globally: `yarn global add @nestjs/cli`.
- Create a new project: `nest new nestjs-template`. Use `yarn`.
- Switched to the development branch: `git checkout -b develop`.
- Add `.nvmrc` with the current Node LTS version. (v18.16.0).
- Use `ncu` to update the dependencies. (Installed with `npm i -g npm-check-updates`)
- Update the ESLint and Prettier configs.
- Update the `tsconfig.build.json`.
- Remove the initial Jest setup.
- Replace Express with Fastify and make it listen to all interfaces. [read more](https://www.fastify.io/docs/latest/Guides/Getting-Started/#your-first-server)
- Add auto-validation pipe using class validator. [read more](https://docs.nestjs.com/techniques/validation#validation-pipes)
- Add `.env*` to `.gitignore`
- Create an `AppConfigModule` that exports a service called `AppConfigService` which provides an already typed version for the `ConfigService.get()` method. We have also used `zod` to validate the environment variables ([read more](https://docs.nestjs.com/techniques/configuration#configuration)). All of this were wrapped in a library, so we can reuse it in other projects. 
