# CSE 5914 Fitness App
Our team is committed to creating an app that saves you from guessing your workouts.  By using Elasticsearch to query a plethora of sources for exercises sorted by muscle group and individual muscle, we can create a streamlined training experience that will increase efficient progress in our users.

![Alt text](Resources/Stronk.png)

# Running the project after any local changes
1. Firstly, run "docker compose build" in the root directory
2. Next, run "docker compose up" to start the server, or "docker compose up -d" to run the server in detached mode which allows you to run other commands after the server is started

Extra:
- When pulling changes from git, if there were any changes for dockerfiles then you will need to run "docker compose down" before repeating steps 1 and 2
- If that doesn't fix your issue, run "git clean -fdx" and then rerun 1 and 2 *BE SURE THAT YOU STASH ANY CHANGES BEFORE DOING SO*
- Last resort that should fix other docker related errors, run "docker compose down -v" instead, but only do this as a last resort as it clears your local docker volumes
- If you run into an error regarding the "elastic" network already existing, that's because one was created when you were individually testing elasticsearch. To fix this, 
    just run "docker network remove elastic" or "docker network elastic remove" (I forget which one).  You can see if the command worked by running "docker network list"
    and make sure you don't see an elastic network, at this point you can go through the other docker commands to bring the containers up.


# Proposed Features
 - Search for exercise by muscle group / muscle
 - Search for exercise by day (Push / Pull / Legs)
 - Inclusion of videos from source to demonstrate movements

# Identifying the Problem

The best way to produce viable output through our code is to first understand our problem space. We've decided to start with some basic questions in an attempt to break down our problem.

<ol>
    Who is our user base? <br>
    What constitues an effective work out? <br>
    What sources will we pull from using Elasticsearch? <br>
</ol>

Tech Stack:
- React
- Flask
- Elastic Search
- Python
- JavaScript
- Docker
- Git (?)

