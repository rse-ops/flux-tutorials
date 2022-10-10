FROM fluxrm/flux-sched:focal

ARG jupyterhub_version=2.3.1

# This should be set on the fly when we create the container
# We make it an argument that also looks nice as a flag
ARG password=playground

RUN sudo apt-get update
RUN DEBIAN_FRONTEND="noninteractive" sudo apt-get -y install \
    python3-pip \
    npm

RUN pip3 install --upgrade pip \
    && pip3 install setuptools-rust zipp==3.7.0 \
    && pip3 install jupyterhub \
    && sudo npm install -g configurable-http-proxy \
    && python3 -m pip install jupyterlab notebook \
    && echo "export PATH=$HOME/.local/bin:$PATH" >> "$HOME/.bashrc"

RUN sudo apt-get clean \
    && sudo apt-get autoremove \
    && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER root

# Generate self-signed cert and key for local use
RUN mkdir -p /srv/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:4096 \
          -subj  "/C=US/ST=CA/O=radiuss-tutorial/CN=radiuss-playground.org" \
          -keyout /srv/certs/jupyter-selfsigned.key \
          -out /srv/certs/jupyter-selfsigned.crt && \
          chown -R fluxuser /srv/certs

# Or copy cert and key signed by a trusted CA
# COPY fullchain.pem /srv/jupyterhub/fullchain.pem
# COPY privkey.pem /srv/jupyterhub/privkey.pem

# Add template override directory and copy our example
RUN mkdir -p /srv/jupyterhub/overrides
COPY notebooks/login.html /srv/jupyterhub/overrides/login.html
 
USER fluxuser 

COPY --chown=fluxuser:fluxuser ./notebooks/jupyterhub_config.py /home/fluxuser/jupyterhub_config.py

RUN git clone https://github.com/flux-framework/flux-workflow-examples.git ./notebooks/flux-workflow-examples
COPY --chown=fluxuser:fluxuser ./notebooks/ ./notebooks
COPY --chown=fluxuser:fluxuser ./notebooks/welcome.sh /welcome.sh

ENV SHELL=/usr/bin/bash
ENV FLUX_URI_RESOLVE_LOCAL=t

# This allows the running user to set the password on the container start
ENV password=${password}
CMD /bin/bash /welcome.sh && \
    echo "c.DummyAuthenticator.password = \"${password}\"" >> /home/fluxuser/jupyterhub_config.py && \
    PATH=$HOME/.local/bin:$PATH \
    flux start --test-size=4 /home/fluxuser/.local/bin/jupyterhub -f /home/fluxuser/jupyterhub_config.py
