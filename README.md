# git-card-game

a game to practice git commands by playing cards with git commands against a npc. 

## Development

### Getting started

Clone the repository  
```sh
git clone https://github.com/Gamify-IT/git-card-game.git
```

Install the dependencies  
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build

Build the Docker-Container
```sh
docker build -t git-card-game-dev
```
And run it at port 8000 with
```sh
docker run -d -p 8000:80 --name git-card-game-dev git-card-game-dev
```

To monitor, stop and remove the container you can use the following commands:
```sh
docker ps -a -f name=git-card-game-dev
```
```sh
docker stop git-card-game-dev
```
```sh
docker rm git-card-game-dev
```

## User manual

Run the docker container with the following command at port 8000:
```sh
docker run -d -p 8000:80 --name git-card-game ghcr.io/gamify-it/git-card-game:latest
```
Now you can access it at [http://localhost:8000](http://localhost:8000).  
To access it externally replace localhost with your IP.  

To monitor the container you can use the following command:
```sh
docker ps -a -f name=git-card-game
```
To stop the container you can use the following command:
```sh
docker stop git-card-game
```
To remove the container you can use the following command:
```sh
docker rm git-card-game
```

### Screenshot

![git-card-game screenshot](https://user-images.githubusercontent.com/44726248/171060580-dd90d220-0c1d-4933-bbac-429ac06218ad.png)
