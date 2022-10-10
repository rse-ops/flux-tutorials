# Flux Tutorials

This repository contains flux tutorials! It is an experiment to get ready
for testing a new lab playground where a visitor can request a notebook
to try out lab software. The repository will provide (optionally)
automated builds for containers, or just notebooks that use containers
elsewhere (e.g., Flux already has automated builds alongside the repository).
These tutorials originally came from [the officials tutorials repository](https://github.com/flux-framework/Tutorials).

🚧️ **under development** 🚧️

## Instructions for Setup

If you want to deploy your own tutorials repository, you can use this one as a template!

### Tutorials

Each tutorial is basically a notebook and a base container, where the base
container should have jupyter installed and your tutorial software. Each tutorial
should be put under a named group, under "tutorials":

```console
tutorials/

    latest/
      # This is optional, if a base container is elsewhere it can be referenced
      Dockerfile

      # Supporting materials can go in this top level directory
      # This material you don't want to share publicly (in the UI)
      presentation.pptx
      
      # Material in this directory can be linked/shared in the playground
      public/
          presentation.pdf

      # Numbered to present a logical ordering (like a table of contents)
      notebooks/
          01-getting-started.ipynb
          02-developer-tutorial.ipynb

      # Metadata about the tutorials and resources
      tutorial.yaml
    22.04/
        ...
```

And it's up to you how to organize! In the example above we use a latest and version,
however you could also namespace to cloud providers and dates, or even HPC conferences
that you present them at. Also note the contents under each. If a `Dockerfile`
is provided in the tutorial folder, this should build the base, and this is specified
in `container.yaml`. By default, the containers will build to `ghcr.io/<org>/<repository>/<tutorial>`.
For the tutorial here, we might see `ghcr.io/rse-ops/flux-tutorial:latest`.

### Metadata

Each tutorial folder has a `tutorial.yaml` file that will be used to deploy
the tutorial and to generate the site (with metadata). Importantly, you should
provide the name of an associated project repository on GitHub that will provide
more metadata about the project, along with labels that map to instance preferences
for each. This is currently a limited set, and will be expanded.

```yaml
title: "Flux Tutorial: 2022 for RADIUSS"
container:
  name: ghcr.io/rse-ops/flux-radiuss-aws-2022:jupyter-3.0.0
  # This should be changed for a production deployment
  env:
    GLOBAL_PASSWORD: "playground"
  ports:
    - 443:443
project:
  github: flux-framework/flux-core  
notebooks:
  - name: 01-radiuss-aws-flux.ipynb
    title: Flux Jobs Tutorial
```

We currently ask for a GitHub identifier to retrieve metadata about the project.
The current assumption above is that tutorials are grouped based on similar resource needs using the same container.

### Site

The only change needed in the [docs](docs) folder is to update the [_config.yml](_config.yml)
to include your repository metadata.

### Validation

Your tutorial metadata will be validated with the [.github/workflows/main.yaml](.github/workflows/main.yaml).
More specifically, we build the site static json API that will be used by associated tools to deploy
the tutorials, and check the following:

1. Your tutorial names are all lowercase, with only special characters `-` allowed
2. A title, container, and project (with github name) are defined
3. The GitHub name only has one slash (no git@ or https, etc.)
4. The docker container needs to be pullable.

License
-------

Copyright (c) 2022, Lawrence Livermore National Security, LLC. 
Produced at the Lawrence Livermore National Laboratory.

RADIUSS is licensed under the MIT license [LICENSE](./LICENSE).

Copyrights and patents in the RADIUSS Docker project are retained by
contributors. No copyright assignment is required to contribute to RADIUSS
Docker.

This work was produced under the auspices of the U.S. Department of
Energy by Lawrence Livermore National Laboratory under Contract
DE-AC52-07NA27344.
