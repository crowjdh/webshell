#!/bin/sh

USAGE="Usage: $(basename $0) [COMMAND]"

INTERACTIVE=0

send_command() {
  COMMAND=$(printf -- "$1" | sed -E "s/ /%20/g")
  curl ${HOST_URL:-localhost}:6660\?cmd="$COMMAND"
}

while [ $# -gt 0 ] && [ ${1:0:1} = "-" ]; do
  case $1 in
    -v|--verbose)
      printf "$USAGE\n"
      exit
      ;;
    -i|--interactive)
      INTERACTIVE=1
      ;;
  esac

  shift
done

if [ $INTERACTIVE -eq 0 ]; then
  if [ $# -lt 1 ]; then
    printf "$USAGE\n"
    exit 1
  fi

  send_command "$1"
else
  printf "Welcome to interactive webshell prompt.\n"
  printf "Type Ctrl+C or type \"exit\" to quit\n\n"

  while true; do
    read -p "Command: " COMMAND

    if [ "$COMMAND" = "exit" ]; then
      break
    fi

    send_command "$COMMAND"
  done
fi
