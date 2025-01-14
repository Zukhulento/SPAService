import express, { Router } from "express";
import path from "path";

// Defining props
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  // Instancing app to use express
  private app = express();
  // Env's
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    // Obtaining the env's and setting them in the class
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares

    //* Public folders
    // If the request is to root the server returns this
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    // Any other request is served by this
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
    // Running the server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
