## Prerequisites

- docker
- nvm
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
```
- typescript
`npm install typescript --save-dev`

- playwwight
`npm init playwright@latest`


## How to run the tests
Follow the instructions in the assignment file to start Kong Manager
```
npx playwright test
````
### How to show the html report
```
npx playwright show-report
````

## Considerations and assumptions
I decided to test only one flow to create a service with a single route but there are different ways to create services and route via the UI. It is possible to extend the test cases to use a different UI path to create the service, using the Overview for example.
The code is already prepared to be expanded since various functions are created and can be used in different scenarios (probably they can be moved to the helpers folder).

I did also tested a bit the page layout of Kong Manager, and also this can be extended to cover all tabs and configurations.

I did use the API instead to delete Service and Route at the end of the test run to keep the envirnoment clean and to not interfeer with other tests that could run after this one.

An additional consideration is also that both Service and Route could be created directly using the API and use the UI to verify that this reflects what is done via API, sometimes this approach is the way to go since testing on the UI could be flaky, of course it depends on what it is the scope of the testing and should be evaluated case by case.


