#!/bin/bash

mongoimport --host mongodb --db fakey --collection accounts --type json --file accounts.json --jsonArray
mongoimport --host mongodb --db fakey --collection tickets --type json --file tickets.json --jsonArray
mongoimport --host mongodb --db fakey --collection users --type json --file users.json --jsonArray
mongoimport --host mongodb --db fakey --collection events --type json --file events.json --jsonArray