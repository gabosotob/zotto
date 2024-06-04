import { Router } from 'express';

import MockCrudService from './tests/mocks/service.mock';

const router = Router();
const service = new MockCrudService();

router.get('/not-zottos', async (_req, res) => {
    try {
        const data = await service.read();

        res.status(200).json({
            ok: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
        });
    }
});

router.get('/not-zottos/:id', async (req, res) => {
    try {
        const data = await service.readById(req.params.id);

        if (!data) {
            throw new Error('Not found');
        }

        res.status(200).json({
            ok: true,
            data,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'Not found') {
            res.status(404).json({
                ok: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                ok: false,
                message: 'Internal server error',
            });
        }
    }
});

router.post('/not-zottos', async (req, res) => {
    try {
        const data = await service.create(req.body);

        res.status(200).json({
            ok: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
        });
    }
});

router.put('/not-zottos/:id', async (req, res) => {
    try {
        const idData = await service.readById(req.params.id);

        if (!idData) {
            throw new Error('Not found');
        }

        const data = await service.update(req.body);

        res.status(200).json({
            ok: true,
            data,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'Not found') {
            res.status(404).json({
                ok: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                ok: false,
                message: 'Internal server error',
            });
        }
    }
});

router.delete('/not-zottos/:id', async (req, res) => {
    try {
        const idData = await service.readById(req.params.id);

        if (!idData) {
            throw new Error('Not found');
        }

        await service.delete(req.params.id);

        res.status(200).json({
            ok: true,
            data: `deleted not zotto with id ${req.params.id}`,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'Not found') {
            res.status(404).json({
                ok: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                ok: false,
                message: 'Internal server error',
            });
        }
    }
});

export default router;
