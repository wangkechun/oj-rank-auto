build: Dockerfile
	docker build -t learn/rank .

run: build
  docker run -it --rm -p 8099:80 learn/rank

default: run

.PHONY: default run