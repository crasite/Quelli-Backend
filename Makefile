VERSION=0.0.1

serve:
	MONGODB_URI=mongodb://localhost:27017 STAGE=production node app.js

mongo:
	docker run -p 27017:27017 mongo  

docker-run:
	docker run -p 3000:3000 quelli-backend:${VERSION}

docker-build:
	docker build -t quelli-backend:${VERSION} . 