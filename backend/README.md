# Backend

My first experience with Typescript, NestJS and PostGres, so it's almost everything in the backend new to me (but typescript is 99% equals to JS).

I used as reference, ChatGPT (for explanations), NestJS documentation (PostGres and TypeORM on this link: https://docs.nestjs.com/recipes/sql-typeorm) and some videos on youtube.

### What I understood in the backend?

src/controllers -> Basically the controllers that I would use in express for the HTTP requests
src/entity -> Schema of the table of my database
src/modules -> Organization of the different types of data, to be imported in the app
src/providers -> Creates the instacies to be injected in another components like services, modules and controllers
src/services -> Functions to be imported
src/app.module.ts -> Full organization of the modules, controllers and providers
src/main.ts -> The first executed file of the server, being its duty to open connection of the server

So basically, the backend will only provide information for the frontend like an own API.