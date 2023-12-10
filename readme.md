# Skill test

## Issue description

Issue. User can not register in account. And can not login to profile page.

## Expected behavior

User is able to register, login and get access to his profile page

## Found bugs

### package.json

```bash
"server": "cd backend & npm start", -> 
"server": "cd backend && npm start"
```

---

### error:0308010C:digital envelope routines::unsupported

*Command*: yarn start

*Error*: `error:0308010C:digital envelope routines::unsupported`

*Reason*: node v20.9.0

*Solution*: add information about required version of node (~16) to readme/maintain solution and upgrade node version and all related packages to last stable version of node, if it's possible

```nvm use v16.13.0```

---

### project contains separate project for backend with packages.json not in root

So I think it is reasonable to add separate script to package json for first initialization

```bash
"init-project": "yarn install && cd backend && yarn install"
```

So you can get working solution right from root folder, without cd/install routines

---


## Possible improvements
