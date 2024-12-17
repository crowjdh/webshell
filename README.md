# Setup
```console
$ npm install
```

# Run
```console
server-terminal $ npm run server
```

# Inject
```console
attacker-terminal $ npm run generate_payload
attacker-terminal $ ./inject.sh
```

# Exploit
## Run Remote Code
```console
attacker-terminal $ ./execute_command.sh 'echo "echo asdf" > /tmp/scary_virus.sh'
attacker-terminal $ ./execute_command.sh '/tmp/scary_virus.sh'
```

## Prank
```console
attacker-terminal $ ./execute_command.sh 'echo hi >> /dev/pts/$(ls -t /dev/pts | head -n 1)'
```
