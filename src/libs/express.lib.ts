import express, { Request, RequestHandler, Response, Router } from 'express';

if (!express) {
    throw new Error('express is not installed');
}

export default express;
export { Response, Request, Router, RequestHandler };
