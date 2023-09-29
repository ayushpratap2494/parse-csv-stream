const EventEmitter = require('events');
const { Transform } = require('stream');

class ParseCSVstream extends Transform {

    constructor(options) {

        super({ objectMode: true });

        this.events = new EventEmitter();

        //setting up default options.
        let { delimiter = ',', wrapper = '"', newlineSeperator = '\r\n' } = options;

        this.delimiter = delimiter;
        this.wrapper = wrapper;
        this.newlineSeperator = newlineSeperator;
        this.headers = null;
        this.skipHeaders = true;
    }

    parse(chunk) {

        //split data on new line.
        let lines = chunk.split(this.newlineSeperator);

        //create headers.
        if (!this.headers) {
            this.headers = this.processLine(lines[0], this.delimiter, this.wrapper);
        }

        //create batches of json objects for remaining rows.
        let batch = [];

        //Create new row for each line.
        let i = this.skipHeaders ? 1 : 0;
        for (i; i < lines.length; i++) {

            let line = this.processLine(lines[i], this.delimiter, this.wrapper);

            let row = {};

            //For each header assign properties to row.
            for (let j = 0; j < this.headers.length; j++) {
                row[this.headers[j]] = line[j] ? line[j] : undefined;
            }

            batch.push(row);
        }

        this.skipHeaders = false;

        //Do something with the batch.
        batch.forEach(row => {
            this.events.emit('data', row);
        });

        return batch;
    }

    processLine(line, delimiter = ',', wrapper = '"') {
        let values = []; let str = ''; let wrapStart = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] == wrapper) {
                wrapStart = !wrapStart;
            }
            else if (!wrapStart && line[i] == delimiter) {
                values.push(str);
                str = '';
            } else str += line[i];
        }
        values.push(str); //last item.
        return values;
    }

    _transform(chunk, encoding, callback) {
        let list = this.parse(chunk.toString());
        // list.forEach(l => this.push(JSON.stringify(l)));
        this.push(JSON.stringify(list));
        callback();
    }

}

module.exports = ParseCSVstream;