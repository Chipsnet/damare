#docker build -t damare .

FROM node:lts-buster

RUN apt update && apt install -y vim wget open-jtalk
RUN git clone https://github.com/Chipsnet/damare.git
WORKDIR /damare
RUN yarn install

COPY config.yml .
RUN yarn start

ENTRYPOINT ["/bin/sh", "-c", "while :; do sleep 10; done"]
