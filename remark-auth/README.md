# remark-auth

Authorization functions for the [Remark project](github.com/triszt4n/remark) by _triszt4n_.

It was easier to lift out the reusable code from the backend into an NPM package, so it the functions could be versioned and easily built with the Azure Functions (and for better performance).

_Note for me:_ Use `npm publish --access=public` for publishing this package.

## Usage

In your Azure Function when you want to read the user from the _Authorization_ header, use this snippet:

```ts
// Authorization
const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
if (result.isError) {
  context.res = {
    // An example for how you might want to return with the error message
    status: result.status,
    body: { message: result.message }
  }
  return
}
const { userFromJwt } = result
```

If you want to create a token:

```ts
const jwtToken = createJWT(dbUser, process.env.JWT_PRIVATE_KEY, 60 * 60 * 24 * 2) // two days
```

## Licence

MIT, see in LICENSE file.
