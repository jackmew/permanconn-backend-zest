# Permanconn-frontend-zest

## npm scripts
- `npm install` – install dependencies
- `npm run dev` – start dev server

## production build
- `npm run build` – build production version
- `npm start` – run production version

#### Open url - http://localhost:3001/permanconn-backend-zest/products
![Table](./screenshots/screenshot1.png)
![Form](./screenshots/screenshot2.png)

## Docker build and push
- `cd ./scripts` - go to scripts folder
- `./push-new-image.sh` - build docker image and push

## Docker run
- ` docker run -d -p 3001:3001 \                                                                                                                                                  10:49:09
  -e MONGODB_URI=mongodb+srv://zest:{passowrd}@cluster-au.msxb9kf.mongodb.net/permanconn-zest \
  --name permanconn-backend-zest zestlifia/permanconn-backend-zest:latest` - run docker image
