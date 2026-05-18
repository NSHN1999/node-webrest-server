import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options{
  port:number;
  public_path?:string;
};

export class Server{
  private app = express();
  private readonly port:number;
  private readonly publicPath:string;

  constructor(options:Options){
    const {port, public_path = 'public'} = options;
    this.port = port;
    this.publicPath = public_path;
  };

  start = async() => {
    //Midelwares
    //Folder public
    this.app.use(express.static(this.publicPath));

    this.app.get('/*splat', (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`server running on port http://localhost:${this.port}`);
    });
  };
};