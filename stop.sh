#!/bin/bash


function printhelp() {
    echo "Script requires two arguments:"
    echo "State:"
    echo "    local             Stop both the database and api instances"
    echo "    remote            Stop the API instance connected to Atlas"

}

function localStop() {
  echo "Stopping both the local containers"
  docker-compose -f ./docker-compose-local.yml down
}

function atlasStop() {
  echo "Stopping the API instance connected to Atlas"
  docker-compose -f ./docker-compose-atlas.yml down
}

if [ "$#" -ne 1 ]; then
    printhelp
    exit 1
fi

state=$1

if [[ "$state" == "local" ]]; then 
  localStop
else
  atlasStop
fi
