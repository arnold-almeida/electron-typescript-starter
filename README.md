# Electon webpack typescript

## Versions

- node `10.19.0`
- realm `3.6.5`
- electron `4.2.12`

### Builing realm

The correct way to compile realm from source is as follows.

```bash
# Clone source git repository
git clone https://github.com/realm/realm-js.git
cd realm-js
git submodule update --init --recursive

# Rebuild the binary from scratch
npm run rebuild --force=true

# NOPE...
# was compiled against a different Node.js version using
# NODE_MODULE_VERSION 64. This version of Node.js requires
# NODE_MODULE_VERSION 76. Please try re-compiling or re-installing
```

Search paths based on `node` / `electron` versions

- [fails] `node_modules/realm/compiled/node-v64_darwin_x64/realm.node`
- [fails] `node_modules/realm/compiled/electron-v8.1_darwin_x64/realm.node`
- [works] `node_modules/realm/compiled/electron-v4.2_darwin_x64/realm.node`

## Development

```bash
# load correct node version
nvm use

# install dependencies
yarn

# local development
yarn dev
```

## Release

```bash
yarn package
```

## Reading

Context Providers for Realm

- <https://github.com/realm/react-realm-context>
