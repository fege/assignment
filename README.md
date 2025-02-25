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


### How to run the tests and show the report

```
npx playwright test
npx playwright show-report
````

