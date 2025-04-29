# Remote React Component Module Federation Example
An example of how Module Federation works with Remote React Components...

The nice thing about [Module Federation](https://module-federation.io/) is that it can somewhat automatically de-dupe dependencies.
* The remote component webpack is configured to chunk each dependency as a separate file
* Both the host app and the remote use axios
* When the component loads, the browser doesn't need to grab axios, since that requirement is already satisfied by the host


To run... easiest with two terminal windows

* Host
  * `cd host-server; npm i; npm run start`
* Component
  * `cd remote-component; npm i; npm run serve`
    
App: http://localhost:3000/
