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

//There are 2 approaches you can take : events, stream, choose any one.

// [1.] working with events.
events.on('data', (row) => {
    console.log(row);
})

readStream.on('data', (chunk) => {
    parser.parse(chunk);
});

//[2.] Working with streams.
readStream.pipe(parser).pipe(writeStream);
```

## Built With

* Native Node.js modules 
* No external dependencies.

## Authors

* **Ayush Pratap** - *Initial work* - [AyushPratap](https://github.com/ayushpratap2494)

## License

[MIT License] © Ayush Pratap