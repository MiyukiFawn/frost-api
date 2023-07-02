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
  > **EX**: *DATABASE_URL=mysql://root:root@localhost:3306/mydatabase?sslmode=disable*

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer and [Docker](https://www.docker.com) *(Optional)*. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/GEYWYD/frost-api

# Go into the repository
$ cd frost-api

# Setup prisma Client
$ npx prisma generate

# Create docker containers
$ docker-compose up

# Migrate database
$ npx prisma migrate dev

```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Docker
**This step is completely optional if you have a Database running in your computer.**

The only inportant part here is to define the right port, a password and you'r Database of choise, in this case i'm using MySql.

```yml
version: '3.9'

services:
  db:
    image: mysql:latest
    environment:
      - MYSQL_ROOT_PASSWORD=root
    ports:
      - '3306:3306'

```

Feel free to use it as a template for your own REST API, learn new stuff or just messing aroud :D

Have fun!

---

> GitHub [@Miyuki](https://github.com/GEYWYD)

