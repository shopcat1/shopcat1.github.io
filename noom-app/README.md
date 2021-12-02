# Noom controller 

## Usage 
The built app is in the build folder. That directory can be served from there, or draged into a folder where it can be used. Note, the project expects to be in the root of the domain. 

## Changing buttons or arguments 
within the file buttons.json, all changes can be made. The built version of the file lives in build/buttons.json. The source version of it lives in public/buttons.json

Note: if you are planing on changing it in the live build, make sure to also change it in the public folder, otherwise on subsequent builds, you will lose the changes. 


## Rebuilding 
If you plan to rebuild the project, be sure to run `yarn install` in the root of the project. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\

