[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# parse-csv-stream

> Parse csv files via stream or parse any csv stream from various sources in Node.js for different usecases like batch processing, database insertion, logging, file creation & data transformations etc. Support for large csv files added.

Example:

```tsx
const parse_csv = require('parse-csv-stream');
const fs = require('fs');

const readStream = fs.createReadStream('./test.csv', 'utf8');
const writeStream = fs.createWriteStream('./test.json');

//default option.
const options = {
    // delimiter: ',',
    // wrapper: '"',
    // newlineSeperator: '\r\n'
};

const parser = new parse_csv(options);
const events = parser.events;

/*
There are 2 approaches you can take : 
[A.] events. 
[B.] streams.

There are 3 ways to handle data : 
[1.] Process each row seperately via events.
[2.] Process resultset (array of rows).
[3.] Pipe parsed stream.
 
 choose any one.
*/

// [A.] working with events.
events.on('data', (row) => {
    console.log(row); //process each row seperately.
})

readStream.on('data', (chunk) => {
   let resultset =  parser.parse(chunk); //process resultset (array of rows).
});

//[B.] Working with streams.
readStream.pipe(parser).pipe(writeStream); //pipe parsed stream.
```

## Built With

* Native Node.js modules 
* No external dependencies.

## Authors

* **Ayush Pratap** - *Initial work* - [AyushPratap](https://github.com/ayushpratap2494)

## License

[MIT License] © Ayush Pratap