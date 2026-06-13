import { envs } from "./configurations/envs.js";
import { Server } from "./presentation/server.js";
import { AppRouter } from "./presentation/routes.js";

(async () => {
  main();
})();

function main(){
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRouter.routes
  });

  server.start();
}; 