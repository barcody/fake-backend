# fake-backend

3rd party backend simulation

## Installation

### clone remote repo

> develop branch is the default branch

```bash
git clone https://github.com/barcody/fake-backend.git
```

### Running development evnironment

```shell
cd fake-backend
```

The below command runs mongodb and mongo-express containers.

```shell
make run
```

The below command stops the containers.

```shell
make stop
```

> You may need to create a new root user to connect with mongodb, below command should help you.

```bash
db.createUser(
    {
        user: "root",
        pwd: "123456",
        roles:[
            {
                role: "userAdminAnyDatabase",
                db:"admin"
            }
        ]
    }
)
```

Run backend server

```bash
npm run start
```

_Please create a [new issue](https://github.com/barcody/fake-backend/issues) if something unclear, incorrect or missing steps._
