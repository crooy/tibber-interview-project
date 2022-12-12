# Tibber Test app by Ronald Crooy

## what I did

Step one for an app like this for me is to find a skeleton app not too big with the things I need. In this case it was a typescript + expressjs app with unit testing, which I then proceeded to clean of the things I did not need.

Second step is to add implementation and unit tests, since this is a tiny thing to build I wrote tests and code all at once up until the database part. Here I focussed on the overall layout of the implementation.

Third step is to validate tests function and it all works, again excluding database. The database I added last, which means fixing the docker-compose, dot-env files and implementing the SQL part.

## Structure

- the router (controller) for the bot is in `src/controller`, this just connects things and hooks it into the expressjs-router.
- the logic is in `src/lib` for both the SQL part and the bot logic
- the rest is boilerplate stuff for getting a nodejs app working nicely

## What I would use if not restricted by specs

Only Deno instead of NodeJS I think.
