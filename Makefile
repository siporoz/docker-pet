mongo:
	docker run -p 27017:27017  \
	-d \
	--rm \
	 --name mongodb \
	 --env-file ./config/development.env\
	 --network notes-net \
	 -v mongo-data:/data/db \
	 mongo

backend:
	docker run -p 7100:7100 \
		--rm \
		--name notes-backend \
		-d \
		-v /Users/nikitasolovev/Desktop/docker-mern-master/server/:/app \
		-v /app/node_modules \
		--env-file ./config/development.env \
		--network notes-net \
		notes-backend

buildBackend:
	docker build -t notes-backend ./server

buildFrontend:
	docker build -t notes-frontend ./client

frontend:
	docker run -p 3000:3000 \
		--rm \
		-d \
		-v /Users/nikitasolovev/Desktop/docker-mern-master/client/src:/app/src \
		-v /app/node_modules \
		--name notes-frontend \
		notes-fronted

stop:
	docker stop mongodb notes-frontend notes-backend

dev:
	docker compose -f docker-compose.yml up -d

build:
	docker-compose -f docker-compose.production.yml up

down:
	docker-compose down