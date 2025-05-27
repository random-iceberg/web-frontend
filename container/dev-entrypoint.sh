#!/usr/bin/env bash

function sync() {
    while true; do
        sleep 1
        rsync -a --delete /to_sync/src/ /app/src/
    done
}

sync &

exec "$@"
