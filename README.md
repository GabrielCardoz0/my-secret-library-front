# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

To configure the application, you need to create a `.env` file in the root directory of the project. Follow the steps below to fill in the necessary environment variables:

1. Duplicate the `.env.example` file and rename it to `.env`.

2. Open the `.env` file in a text editor.

3. Replace the placeholder values with your own configuration. Here are the variables you need to set:

    - `VITE_API_URL`: Your API key for accessing external services.
    - `VITE_COOKIE_SECRET`: A secret key used for encryption and security purposes.


4. Save the `.env` file.


Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
