<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/GEYWYD/frost-api/main/Frost-Star-icon.png" alt="Markdownify" width="200"></a>
  <br>
  Frost API
  <br>
</h1>

<h4 align="center">Just an API developed for learning purpose</h4>

<p align="center">
  <a href="#Setup">Setup</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#docker">Docker</a> •
</p>

## Setup

* Create a **.env** file on the root folder
* add the folowing *DATABASE_URL=mysql://***<username>***:***<password>***@***<url>***:***<port>***/***<database>***?sslmode=disable*
  > **EX**: *DATABASE_URL=mysql://root:root@database:3306/mydatabase?sslmode=disable*

  > **DISCLAIMER**: The url must be the same as the link name on the **docker-compose.yml** (more on that later) 

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer and [Docker](https://www.docker.com). From your command line:

```bash
# Clone this repository
$ git clone https://github.com/GEYWYD/frost-api

# Go into the repository
$ cd frost-api
# Create docker containers
$ docker-compose up

```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Docker
Remember when i said that the url on the **DATABASE_URL** need to be the same as the link name on the **docker-compose.yml**? Well, here it is:

```yml
version: '3.9'

services:
  db:
    image: mysql:latest
    container_name: database
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=root
    ports:
      - '3306:3306'

  app:
    container_name: 'api'
    build: .
    command: npm start
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/app

    links:
      #THIS RIGHT HERE IS THE LINK#
      #WE HAVE THE CONTAINER'S NAME AND AFTER THAT THE LINK NAME#
      - "db:database"

```

Feel free to use it as a template for your own REST API, learn new stuff or just messing aroud :D

Have fun!

---

> GitHub [@Miyuki](https://github.com/GEYWYD)

