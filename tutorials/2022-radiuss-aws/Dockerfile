FROM fluxrm/flux-sched:focal

ARG jupyterhub_version=2.3.1

RUN sudo apt-get update
RUN DEBIAN_FRONTEND="noninteractive" sudo apt-get -y install \
    python3-pip \
    npm

RUN pip3 install setuptools-rust zipp==3.7.0 \
    && pip3 install jupyterhub==$jupyterhub_version} \
    && sudo npm install -g configurable-http-proxy \
    && python3 -m pip install jupyterlab notebook \
    && echo "export PATH=$HOME/.local/bin:$PATH" >> "$HOME/.bashrc"

RUN sudo apt-get clean \
    && sudo apt-get autoremove \
    && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN git clone https://github.com/flux-framework/flux-workflow-examples.git

COPY --chown=fluxuser:fluxuser notebooks/01-radiuss-aws-flux.ipynb .
COPY --chown=fluxuser:fluxuser notebooks/sleep_batch.sh .
COPY --chown=fluxuser:fluxuser notebooks/sleeps.sh .
COPY --chown=fluxuser:fluxuser notebooks/sub_job1.sh .
COPY --chown=fluxuser:fluxuser notebooks/sub_job2.sh .
COPY --chown=fluxuser:fluxuser notebooks/Flux-logo.svg .

ENV SHELL=/usr/bin/bash
ENV FLUX_URI_RESOLVE_LOCAL=t

CMD PATH=$HOME/.local/bin:$PATH \
    flux start --test-size=4 /home/fluxuser/.local/bin/jupyterhub-singleuser
