#!/bin/bash
# Install buildx for arm64 and enable the Docker CLI plugin

sudo apt-get install jq
mkdir -p ~/.docker/cli-plugins
BUILDX_URL=$(curl https://api.github.com/repos/docker/buildx/releases/latest | jq -r '.assets[].browser_download_url' | grep arm64)
wget $BUILDX_URL -O ~/.docker/cli-plugins/docker-buildx
chmod +x ~/.docker/cli-plugins/docker-buildx
