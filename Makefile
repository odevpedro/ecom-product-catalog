.PHONY: install build test lint dev start docker-build

install:
	npm install

build:
	npm run build

test:
	npm test

lint:
	npm run lint

dev:
	npm run dev

start:
	npm start

docker-build:
	docker build -t ecom-product-catalog .
