#!/bin/sh

if [ $# -lt 1 ]; then
  printf "Usage: $(basename $0) COMMAND\n"
  exit 1
fi

COMMAND=$(printf -- "$1" | sed -E "s/ /%20/g")

curl localhost:6660\?cmd="$COMMAND"
