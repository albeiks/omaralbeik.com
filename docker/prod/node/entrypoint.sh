#!/bin/bash

yarn build

echo "Running command '$*'"
exec /bin/bash -c "$*"