.PHONY: build

all: serve

serve:
	npm run serve

build:
	docker build . -t endaaman/a2ms

push:
	docker push endaaman/a2ms

start: build
	docker-compose up -d --build

stop:
	docker-compose stop

