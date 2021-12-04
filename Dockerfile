#docker build -t damare .

FROM node:lts-buster

RUN apt update && apt install -y vim wget open-jtalk
RUN git clone https://github.com/Chipsnet/damare.git
WORKDIR /damare
# RUN git checkout Chipsnet/issue3
RUN yarn install

COPY config.yml .
ENTRYPOINT ["yarn", "start"]

