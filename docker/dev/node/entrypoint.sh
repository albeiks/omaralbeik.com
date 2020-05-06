#!/bin/bash

if test -d node_modules;
then
    echo node_modules_exists;
else
    cp -a /tmp/node_modules /usr/src/app/;
fi

echo "Running command '$*'"
exec /bin/bash -c "$*"