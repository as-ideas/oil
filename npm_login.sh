#!/usr/bin/expect

set username [lindex $argv 0]
set password [lindex $argv 1]
set email [lindex $argv 2]

spawn npm login
expect -exact "Username: "
send -- "$username\r"
expect -exact "\rPassword: "
send -- "$password\r"
expect -exact "\rEmail: (this IS public) "
send -- "$email\r"
expect eof
