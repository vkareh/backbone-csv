Backbone CSV
------------
Server-side overrides for Backbone to use `node-csv-parser` for Model persistence.

This module only implements the `read/GET` method at this moment. I'm open to
pull requests.

### Usage

Pass a filepath to the CSV file (will be created if it doesn't exist yet) when
calling `require()`.

    var Backbone = require('backbone');
    Backbone.sync = require('backbone-csv')('./data.csv').sync;

    // Backbone.sync will now load and save models from data.csv.

### Conventions

`backbone-csv` stores models in the CSV file using the column name set in
`idAttribute` as its key.

Given a CSV file with the following format:

    "name", "city"
    "University of Michigan", "Ann Arbor"
    "Massachussetts Institute of Technology", "Cambridge"
    "Stanford University", "Stanford"

You can load it as a Collection in the following way:

    var SchoolModel = Backbone.Model.extend({idAttribute: "name"});
    var SchoolCollection = Backbone.Collection.extend({model: SchoolModel});

    var schools = new SchoolCollection();
    
    schools.fetch();
    // Retrieves SchoolModels with the following attributes:
    // {name: "University of Michigan", city: "Ann Arbor"}
    // {name: "Massachusetts Institute of Technology", city: "Cambridge"}
    // {name: "Stanford University", city: "Stanford"}

### Authors

- [Victor Kareh](http://github.com/vkareh)
