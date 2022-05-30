
# **Test**
Rules in test requirement is already added.\
To add more rules please notice:
- Item Type: Condition to get discount.
- Discount Type: Discount result reflect with the Item Type.
- Operator is used for "ALL" product in Discount Type only.
- "EACH" product is used amount comparision only, ignore the Operator.
- Price and Percent can be used once at the same time.
- If 2 discount with the same condition is added, the latest one will have more priority.

# **Getting Started**

**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

- Clone the branch in the repository

```
git clone https://github.com/ttmhxgit/tillpos.git
```

- Use [NodeJs](https://nodejs.org/) version v14.17.2 or upper

```
node -v
```

- Use package manager [Yarn](https://yarnpkg.com/) version 1.22.10 or upper

```
yarn -v  
```

# **Script**
In the project directory, you can run:

```
yarn
```
Install all needed package

```
yarn run start
```
Runs the app in the development mode.Open [http://localhost:3000] to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

```
yarn run test
```
Launches the test runner in the interactive watch mode.

```
yarn run build
```
Builds the app for production to the build folder. It correctly bundles React in production mode.

```
yarn run eject
```
It will stop hiding what it's got installed under the hood and instead eject those things into your project's package.json for everyone to see.
# **Library**
- **[React](https://reactjs.org/)** _(v18.1.0)_
- Styling using **[TailwindCSS](https://tailwindcss.com/)**
