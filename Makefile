VERSION=0.0.6

serve:
	MONGODB_URI=localhost:27017 STAGE=dev node app.js

mongo:
	docker run -p 27017:27017 mongo  

docker-run:
	docker run -p 3000:3000 quelli-backend:${VERSION}

docker-push:
	docker login
	docker build -t quelli-backend:${VERSION} . 
	docker tag quelli-backend:${VERSION} paichana/quelli-backend:${VERSION}
	docker push paichana/quelli-backend:${VERSION}