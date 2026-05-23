import express, { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options{
  port:number;
  public_path?:string;
  routes:Router;
};

export class Server{
  private app = express();
  private readonly port:number;
  private readonly publicPath:string;
  private readonly routes:Router;

  constructor(options:Options){
    const {port, public_path = 'public', routes} = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  };

  start = async() => {
    //Midelwares
    this.app.use(express.json());//raw
    this.app.use(express.urlencoded({extended: true}));//x-xxx-form-urlencoded

    //Folder public
    this.app.use(express.static(this.publicPath));

    //Routes
    this.app.use(this.routes);

    //SPA
    this.app.get('/*splat', (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    //Running Server
    this.app.listen(this.port, "0.0.0.0",() => {
      console.log(`server running on port http://localhost:${this.port}`);
    });
  };
};