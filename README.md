### Prerequisites

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


### How to run the tests
Follow the instructions in the assignment file to start Kong Manager
```
npx playwright test
````
### How to show the html report
```
npx playwright show-report
````

