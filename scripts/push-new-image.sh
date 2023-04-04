#! /bin/bash

USERNAME="zestlifia"
REPO_NAME="permanconn-backend-zest"
VERSION="$(date '+%Y%m%d%H%M%S')"

docker login --username "$USERNAME" --password-stdin < docker_password.txt

# build docker image
TAG="${USERNAME}/${REPO_NAME}:${VERSION}"
TAG_LATEST="${USERNAME}/${REPO_NAME}:latest"

# build linux/amd64 image
docker build --platform linux/x86_64/v8 -t "$TAG" -t "$TAG_LATEST" -f Dockerfile ..

# push docker image
docker push "$TAG"
docker push "$TAG_LATEST"
