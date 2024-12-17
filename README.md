# Setup
```console
npm install
```

# Run
```console
npm run server
```

# Hack
```console
npm run generate_payload
./hack.sh "ls -lah /"
```

# Exploit
## Run Remote Code
```console
./execute_command.sh 'echo "echo asdf" > /tmp/scary_virus.sh'
./execute_command.sh '/tmp/scary_virus.sh'
```

## Prank
```console
./execute_command.sh 'echo hi >> /dev/pts/$(ls -t /dev/pts | head -n 1)'
```
