// Provides a `Backbone.sync` or `Model.sync` method for the server-side
// context. Uses `node-csv-parser` for model persistence. Each row of the CSV
// file is a Model and each CSV file itself is a Collection. Models are
// expected to have a URL prefixed by their respective collection
// (e.g. `/{class}/{id}`). The `id` of a Model is determined by setting the
// `idAttribute` property to a column name in the CSV file.
module.exports = function(filename) {
    var csv = require('csv');

    // Convert raw data to JSON.
    var toJSON = function(row, columns) {
        var doc = {};
        columns.forEach(function(column, i) {
            doc[column] = row[i];
        });
        return doc;
    }

    // Prepare model for saving.
    var toCSV = function(model) {
        var row = [];
        model.attributes.forEach(function(attribute) {
            row.push('"' + attribute + '"');
        });
        return row.join(',');
    }

    // Sync implementation for `node-csv-parser`.
    var sync = function(method, collection, options) {
        var options = options || {};

        var success = options.success,
            error = options.error;

        if (method != 'read') return options.error('This method has not been implemented yet.');

        switch (method) {
        case 'read':
            var models = [];
            csv({columns: true})
            .fromPath(filename)
            .on('data', function(data, index) {
                if (index == 0) {
                    collection._columns = data;
                } else {
                    collection.push(toJSON(data, collection._columns), {silent: true});
                }
            })
            .on('end', function(count) {
                return success(collection);
            })
            .on('error', function(err) {
                return error(err.message);
            });
            break;
        }
    };

    return { csv: csv, sync: sync };
};
