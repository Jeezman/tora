# TORA Storefront

Tora storefront is a Bitcoin/Lightning applications for selling products.

## Technologies Used

 - NodeJS/Typescript (Backend)
 - NextJS/Typescript (Frontend)
 - PostgresDB (Database)
 - Lightning Network Daemon (LND)
 - Bitcoin (Bitcoin Core)

## How It Works

Tora storefront app can be used by vendors and Bitcoin/Lightning user's who want to buy items online paying with Bitcoin or Sats

 - The vendor can create and account using LNURL-auth or email and password
 - After creating an account the vendor create a store
 - Then add products to the store
 - Buyers can purchase products with bitcoins and satoshis. 

## How To Run

Clone the Github repository 

```git clone https://github.com/Jeezman/tora.git```

### Server

```cd server ```

Create a .env file in the server root folder ```touch .env```, then copy then content in then .env-saomple into the newly created .env file and update the variables values with yours.

```
  npm install
  npm run knex migrate:latest
  npm start
```

### Client

```cd client```

Update the variables values in the .env file with yours.

```
yarn install
yarn dev
```

Built by Olutobi Adeyemi and Raphael Osaze Eyerin
