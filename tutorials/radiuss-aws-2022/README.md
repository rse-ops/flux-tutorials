# RADIUSS AWS 2022

To build the container to test locally:

```bash
$ docker build -t radiuss-aws-2022 .
```

And run the container locally (using default password):

```bash
$ docker run -it -p 443:443 radiuss-aws-2022
```

And then see the welcome message:

```console
$ docker run -it -p 443:443 radiuss-aws-2022
🌀️ Welcome to the Flux Framework RADIUSS Tutorial! 🌀️
If you are running this locally (and can see this message)
You can open your browser to https://127.0.0.1.
We use self-signed certificates, so you can proceed.
Your login information is:

🥑️ user: fluxuser
🥑️ password: playground

Have fun! ⭐️🦄️⭐️
```

And follow the instructions to login and do the tutorial!
