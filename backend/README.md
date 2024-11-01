# API
API used for school Project:
## [StreamShare](https://github.com/MARQUESDINISJoaoGabriel/Server-Web-Efrei-Projet)
*A streaming application based on React js and Express js with typescript.*

</br>

<u>**API made by**</u> [**me**](https://github.com/Math-Vov13)

**Based on:**
- TypeScript
- ExpressJS
- NodeJS
- Nodemon
- Yup

**Technologies used:**
- AWS RDS
- AWS CloudFront
- AWS S3
- PgAdmin4
- Postman
- Vercel


## Dependencies
Setup your Web Environment for TypeScript (https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

Init workspace:
```sh
npm init -y
```

Install packages:
```sh
npm i
```


## Local Environment
You need to create a .env file in the root like that:
```conf
# API
PORT=3000 # API running on port 3000 by default

# Tokens
ACCESS_KEY=secret_key
GROUP_KEY=secret_key
USER_KEY=secret_key

# PostgreSQL (you need to create your own.)
DB_HOST=<endpoint> # endpoint of your Server
DB_PORT=5432 # Running on port 5432 by default
DB_USER=<user> # Your username (generally 'postgres')
DB_PASSWORD=<password> # Your Password (generally 'root')
DB_DATABASE=<database_name> # Your DataBase name
```


## AWS
**To store movies**, you need to create a [CloudFront distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html) with an [S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)

> You can follow a complete guide [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/tutorial-s3-cloudfront-route53-video-streaming.html)

## PostgreSQL
Create your DataBase:
https://www.tutorialsteacher.com/postgresql/create-database

You can use this sql script [here](/backend/src/models/create_tables.sql)
to create your Tables.


## Quick Start

<u>checklist:</u>
> - create .env
> - create DB

When the checklist is complete,

<u>Launch the server:</u>
```sh
npm run dev
```


## Deployment

local :
- localhost

Web:
- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Vercel](https://vercel.com/)