import { Request, Response } from 'express';
import { HelloService } from '../services/HelloService';

export class HelloController {
  private helloService: HelloService;

  constructor() {
    this.helloService = new HelloService();
  }

  public sayHello = (req: Request, res: Response) => {
    const message = this.helloService.getHelloMessage();
    res.json({ message });
  };
}
