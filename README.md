# DARE

### Config need for running dev and tests

Two files in `config` folder, one called `default.json` and another called `test.json`. 
They must have three values filled out:

- `dare_url`: The url with the endpoint to be consumed.
- `client_id` and `client_secret`: Self-explanatory.

### Decisions made while developing

- The Insurance API Rest does not provide any kind of expiration date. I went ahead and just returned the object itself, with no other consideration.
### Tool used for testing

Jest: `$ npm test` will run all the tests.

Postman: The file `DARE-collection.json` contains tests that can be imported and used with Postman Runner.
