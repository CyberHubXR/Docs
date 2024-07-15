# Commands Crash Course

While I've built it out to where you can use -h or --help on anything, I guess I should give a quick rundown of the commands that are available, and how the system generally works.

## Commands

### `help`

The `help` command is a special command that will list out all of the available commands, and remind you that you can also use `--help` or `-h` on any command to get more information about that specific command.

### 'sel' or 'select'

This is the most important command in the system. It allows you to select the organization, application, or user that you're working with. This is important because all other commands are run in the context of the selected entity.

For instance, the `list users` command will list all of the users in the entire system if you haven't selected,
but if you have selected an application or organization, it will filter down to only the users in that context.

### `create`

The `create` command is used to create new entities in the system. You can create organizations, applications, and users with this command.

### `list`

The `list` command is used to list out all of the entities of a certain type. You can list out all of the organizations, applications, or users in the system.

### `show`

The `show` command is used to show the details of a specific entity. It will print out the raw JSON of the entity, which can be useful for copying and pasting into other commands.

### `roles`

The `roles` command is used to manage the roles of a user. You can add or remove roles from a user with this command. You can also list all of the roles that a user has.