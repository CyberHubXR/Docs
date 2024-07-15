# Getting Started

While it doesn't make complete sense for me to have built out a complete CLI interface for an MVP of a database
server, I did it anyway. I wanted to make sure that we had a solid way to manage and interact with this as we're 
going to have to be very hands on with it at first.

## Creating an App Key

The first thing anyone will need to do is create an App Key for a project. This takes a few steps, but it provides a good way to explain how things work along the way.

The database is set up to be multi-tenant, so you can have multiple projects with multiple owners and users. The App Key is the way we identify which project you're working with.

To create an App Key, we'll need to run through the following commands:

```bash

# First, we need to create a new organization to hold our project
create org <NAME>

# Then we need to select it as the active organization, so that all future commands are run in the context of this organization (we can use select or sel here, both are the same command)
sel org <NAME>

# Now we can create a new application in this organization
create app <NAME>

# Next we also select this application as the active application
sel app <NAME>

# Finally, we can print out the App Key that was automatically generated for us
show app

# This will output something like this:
# App: {
#  "_id": {
#    "$oid": "65e92c0a3d8c50a00645a256"
#  },
#  "org_id": {
#    "$oid": "65e92bf23d8c50a00645a255"
#  },
#  "name": "CyberHubWeb",
#  "key": "719e500d-51d8-49d2-80a9-887d2f9e3f09",  <------------------- We're looking for this, it's the App Key
#  "created_at": {
#    "$date": {
#      "$numberLong": "1709779978097"
#    }
#  },
#  "api_calls": 0
#}


# Before we do anything else! We need to also create an admin user for this application, otherwise we won't be able to do anything with it
create user <USERNAME> <PASSWORD> [OPTIONAL_EMAIL]
sel user <USERNAME>
roles add admin

# Now we can log in with this user through the API or anything implementing it!

```