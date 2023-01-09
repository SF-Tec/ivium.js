# Publishing the package to NPM

> ## Step 1: Build Your Package
>
> `npm run build`
>
> The files included in the package and its location are determined by the `files` field of the `package.json` file.
>
> For our package, the contents will be generated inside the `dist` folder.
> ## Step 2: Logging into Your NPM Account
>
> You have to log into your npm account on your system.
>
> Run the following command to log into your npm account:
>
> `npm login`
>
> This will prompt you to fill in your username, password, and a two-factor authentication code (if you enabled it on your account).
>
> ## Step 3: Testing the publication with a Dry Run
>
> After you have completed all the steps above, run the following command to confirm the package can be published without issue. The `--dry` argument indicates that you don't want npm to
> make any changes and that it should only report what it would have done.
>
> `npm publish --dry`
>
> ## Step 4: Publish to NPM
>
> If the previous dry run was uneventful we can proceed and publish the package to the actual NPM registry.
>
> `npm publish`
>
> This command requires a one-time password that will be to your email. Then, it will publish your package on npm.
>
> You can view the packages you have published on npm. Log in to your npm account on [npmjs.com](http://npmjs.com) and navigate to the packages section on your profile dashboard.
>
> To install your package and use it as a dependency on any of your projects, run:
>
> `npm install iviumjs`
