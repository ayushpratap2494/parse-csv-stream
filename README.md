[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# parse-csv-stream

> Parse any csv file via stream or csv stream from any other source in Node.js for various usecases like database insertion, logging, file creation, batch processing data etc.

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