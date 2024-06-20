import { Request, RequestHandler, Response, Router } from 'express';

if (!Request || !Response || !Router) {
    throw new Error('Express not installed. Please install express to use Zotto.');
}

export { Request, Response, Router, RequestHandler };
