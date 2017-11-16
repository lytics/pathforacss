# Pathfora Custom CSS Boilerplate
The Pathfora Custom CSS Boilerplate library is meant to assist and streamline the customization of Lytics Pathfora web personalization campaigns. This library will generate both a minified and non-minified version of the custom files as well as providing a handful of example widgets to test against. 

For full details on how to leverage custom styles in a production environment visit our ["Using Custom CSS for Theming"](https://activate.getlytics.com/resources/documentation/personalization_editor_design) docs. 

## Overview
Upon running the program as instructed below you will see `dist` directory generated. This will contain the compiled output of your CSS as well as any other image resources or alterations to the sample .html pages you have made. This is also the directly being served locally as part of the default `gulp` command.

When it comes to altering files you will want to head to `src` for the raw source files. In there you will find:

`html`: This directory contains the base html files for testing. They can be altered to mimic your particular implementation but as a convenience we have included two test files that showcase many of the widget types on one page. 

`img`: This directory will contain any custom images you have. When moving to production you will want to host these files behind a CDN of some sort and then update the references on your widgets but during testing having the assets locally is a convenience. 

`less`: This is where all of the custom styling will occur. Out of the box we have included a direct copy of all Pathfora default style files with and commented out the current definitions. This allows you to easily uncomment the particular styles that need adjusting while maintaining all of the proper nested relationships to ensure overrides are applied without issue. 

In addition, we have included a sample of a class specific override called "customclass". This follows our recommended approach for applying class specific overrides as, again, it will ensure all overrides are applied without issue.

## Running
To run this app locally you will need `node` installed. More information on how to install `node` and `npm` can be found [here](https://nodejs.org).

```js
$ npm install
```

```js
$ gulp
```
Finally visit `localhost:1234` in your browser to see the app running locally. The default `gulp` command will compile all files, watch for changes and continue to run a local server to test against. 

When looking to just build all the files without running a local server and watching for changes you can run:

```js
$ gulp build
```

## Testing
As a convenience we have included two base .html files. One showcasing modals with images (variant 2) and another showcasing modals without images (variant 1). With the server running as described above visiting [http://localhost:1234](http://localhost:1234) will result in a screen with links to each test version. Simply click the type of modals you would like to review, or add another .html file to test your custom modal and simply alter the `less` files. 