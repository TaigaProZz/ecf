# Start app localy 

## First, you need to clone the repo :
```
git clone git@github.com:TaigaProZz/ecf.git
```

## Now, install dependencies of project :
**Be sure to have Node.js installed.** ( v18.xx preferable )

Go in `backend` and `front` folder, open your terminal and install it. Use npm or yarn :
```
yarn install
```
or 
```
npm install
```

## Setup your MySQL Database :
- download MySQL Installer from official website, and install MySQL Server. Make sure to configure it well, you'll need it later.
![image](https://github.com/TaigaProZz/ecf/assets/74510014/d9043320-8bc2-4503-8a9e-bccb2bb96c5b)
![image](https://github.com/TaigaProZz/ecf/assets/74510014/e4d5aa11-181b-4306-9832-71c0b7eee1b1)

## Start your database :
- open your `cmd` in **administrator mode**, and execute :
```
net start MySQL80 ( replace MySQL80 with the name you choose, refeer to screen above )
```
## Add and create table :
- download this extension on vs code
![image](https://github.com/TaigaProZz/ecf/assets/74510014/7aa3831a-44ae-40b7-a632-4012d07cc11e)
- connect to it with user that you created during the SQL Installation
- execute all SQL Files of sql folder that you cloned before

## Create .env file :
- create .env file in root of backend folder, paste this, and change values as you need :
```
REACT_APP_DATABASE_HOST= localhost
REACT_APP_DATABASE_USERNAME= your_username
REACT_APP_DATABASE_PASSWORD= your_password
REACT_APP_DATABASE_NAME= your_database_name
REACT_APP_DATABASE_PORT = your_port
REACT_APP_DOMAIN= http://localhost:3000 ( check in your console when front is started )
REACT_APP_API_PORT = 3307

// log for bucket, dont need to have one, only for add new cars
SCW_ACCESS_KEY= ''
SCW_SECRET_KEY= ''
SCW_DEFAULT_ORGANIZATION_ID= ''
SCW_DEFAULT_PROJECT_ID= ''
```

- create .env file in root of front folder, paste this, and change values as you need :
```
REACT_APP_API= http://localhost:3307

// endpoint for add car, dont need to have one, only for add new cars
REACT_APP_CAR_SCW_ENDPOINT= ''
```

## You can start your project, front and back, with : 
```
yarn start
```
or 
```
npm start
```

### You can connect to admin dashboard with : email : vincentparrot@gmail.com  password : a

# Enjoy !
