VERSION=0.0.1

serve:
	STAGE=production node app.js

docker-run:
	docker run -p 3000:3000 quelli-backend:${VERSION}

docker-build:
	docker build -t quelli-backend:${VERSION} . 