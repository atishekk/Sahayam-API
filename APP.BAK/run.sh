#!/bin/bash

function printhelp() {
    echo "Script requires two arguments:"
    echo "State:"
    echo "    local             Run the database container locally"
    echo "    remote            Use the Atlas cluster"
    echo "Logs:"
    echo "    true              Show the logs for the containers"
    echo "    false             Run in detached state"

}

function localRun() {
    echo "Starting local containers for the API and database"
    docker-compose -f ./docker-compose-local.yml up -d
    if [[ "$logs" == "true" ]]; then
        docker-compose -f ./docker-compose-local.yml logs -f
    fi
}

function atlasRun() {
    echo "Using the remote database instances"
    docker-compose -f ./docker-compose-atlas.yml up -d
    if [[ "$logs" == "true" ]]; then
        docker-compose -f ./docker-compose-atlas.yml logs -f
    fi
}

if [ "$#" -ne 2 ]; then
    printhelp
    exit 1
fi

state=$1
logs=$2

if [[ "$state" == "local" ]]; then
    localRun
else
    atlasRun
fi
