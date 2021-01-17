# Charge Hub - Web App

## CI
We have two automated actions configured for the web-app:

-   `webapp-lint`: runs against every branch, required to pass to merge into `main` or `development`.
-   `webapp-deploy`: runs against `main` and `development` and deploys to the dev or live site respectively

## UI Development

1. Ensure you are up to date with the latest code from the development branch.

    ```bash
    git checkout development
    git pull
    ```

1. Checkout a new branch with your changes on it

    ```bash
    git checkout -b feat/my-amazing-new-feature
    ```

1. Change directory into the web-app folder

    ```bash
    cd web-app
    ```

1. Install NPM dependencies

    ```bash
    npm install
    ```

1. Run the UI locally and make / test any changes

    ```bash
    npm run serve
    ```

1. Ensure your branch is still up to date with development

    ```bash
    git pull origin development
    ```

1. Create a PR explaining what you've changed 🦸

## Icons
We have Material Design icons set up as our icon package, all icons can be searched for here:
https://vuetifyjs.com/en/features/icons/#material-design-icons