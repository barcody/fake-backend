#!/bin/bash

# import accounts collection
mongoimport --host mongodb --db fakey --collection accounts --type json --file accounts.json --jsonArray

# import tickets collection
mongoimport --host mongodb --db fakey --collection tickets --type json --file tickets.json --jsonArray

# import users collection
mongoimport --host mongodb --db fakey --collection users --type json --file users.json --jsonArray

# import events collection
mongoimport --host mongodb --db fakey --collection events --type json --file events.json --jsonArray