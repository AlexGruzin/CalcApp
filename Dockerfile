
# stage1 as builder
FROM node:12.18.3 as builder

# copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /calc-ui && mv ./node_modules ./calc-ui

WORKDIR /calc-ui

COPY . .

# Build the project and copy the files
RUN npm run build

RUN npm install -g serve

EXPOSE 80

# use serve lib to view bundle
CMD [ "yarn", "serve" ]
