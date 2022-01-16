> A Node.js project

Deployed on Heroku : http://shpfy.herokuapp.com/

## Setup

- ### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Build Setup

## Install

    $ git clone https://github.com/LobRockyl/shopify-task.git
    $ cd shopify-task
    $ npm install
    $ touch .env

## Setting up the environment variables

Open the .env file in a text editor and paste the following line.

```
MONGO_DB_URI=mongodb+srv://purnashis:purnashis@cluster0.lhecz.mongodb.net/shopify?retryWrites=true&w=majority
```

Not supposed to put a database URI publicly, but this is done so that it is easily setup without any hassle. Just a sample database. You can make your own account on mongo and put ypur srv url here

```
MONGO_DB_URI=<mongo-srv-url-here>
```

# serve at http://127.0.0.1:5000/

```
npm start
```

## Finally go to a browser and put http://127.0.0.1:5000/ and Voila! the webpage should be visible as such

![Screenshot 2022-01-09 at 12 31 57 AM](https://user-images.githubusercontent.com/45710269/148656580-c189768a-c127-4f35-a30b-9c802e6415c5.png)

## About the final product:

This is a simple inventory tracking web application. 
The Feature chosen from the task:
>Ability to assign/remove inventory items to a named group/collection

Features:
1. View all items along with IDs
2. View items grouped by their group name i.e. group1 -> [item1,item2...] group2 -> [item3,item4...]
3. Create item by clicking on Create button and entering name and/or group
4. Edit item by inputting new name and/or group
5. Delete item by inputting ID (ID can be grabbed from the view all items in dashboard)
6. Corresponding validations and alerts of the activities

![Screenshot 2022-01-17 at 4 45 05 AM](https://user-images.githubusercontent.com/45710269/149682099-928adaea-a47d-46ed-82df-577486c58cb8.png)



