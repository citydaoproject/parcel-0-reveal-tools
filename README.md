# CityDAO Parcel 0 Reveal Tools

## Setup

### Node

1.  Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### Environment Setup

Copy `example.env` to `.env` and fill in the values

### IDE Setup

This project uses [EditorConfig](https://editorconfig.org/) for IDE configuration.

See `.editorconfig` for settings.

Many popular IDEs and editors support this out of the box or with a plugin.

## Development

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [ESLint](https://eslint.org/). Check linting before checking in:

```
npm run lint
```

See `tslint.json` for settings.

Many IDEs and editors support TSLint.

## Testing

This project uses [Jest](https://jestjs.io/) for testing. Run tests before checking in.

```
npm test
```

## Building

```
npm run build
```

## Using the CLI

1. Compile the code with `npm run build`
2. Execute the CLI with `bin/parcel-0-reveal-tools.sh ...`
3. Get help with `bin/parcel-0-reveal-tools.sh --help` or 
   `bin/parcel-0-reveal-tools.sh <command> --help`

## Algorithms

See [algo.md](algo.md) for details on the algorithms.
