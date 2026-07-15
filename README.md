# zotto

A lightweight, decorator-based TypeScript framework for building CRUD Express.js APIs, inspired by NestJS-style architecture — plus a CLI to scaffold projects and resources in seconds.

## Features

- **Declarative resources** — define REST endpoints with `@Resource`, `@Get`, `@Post`, `@Put`, `@Patch`, and `@Delete` decorators instead of wiring Express routes by hand.
- **Dependency injection** — `@Service` and `@Repo` decorators, backed by `reflect-metadata`, let controllers, services, and repositories be composed automatically.
- **Built-in HTTP exceptions & responses** — `BadRequestException`, `NotFoundException`, `InternalServerErrorException`, and standardized `OkResponse` DTOs for consistent API output.
- **CLI scaffolding** — the `zotto` CLI can initialize a new project (`zotto init`) and generate new resources (`zotto new:resource <name>`) from ready-made templates.

## Installation

```bash
npm install zotto
```

## Quick start

```bash
npx zotto init
```

This scaffolds a runnable project: pinned dependencies, a `tsconfig.json` with the settings Zotto needs, an `index.ts` entry point, a `start` script, and a sample resource.

```bash
npm start
```

Or define a resource manually. Zotto's dependency injection resolves constructor parameters from TypeScript's emitted type metadata, so every injected parameter must be typed as a real class decorated with `@Service`, `@Repo`, or `@Injectable` — never `any`, since no metadata is emitted for that type and it can't be resolved:

```ts
import { Request } from 'express';
import { Delete, Entity, Get, Id, LocalRepo, NotFoundException, Post, Put, Resource, ResourceFactory, Service } from 'zotto';

interface Item extends Entity {
  name: string;
}

@Service()
class ItemService {
  constructor(private readonly repo: LocalRepo<Item>) {}

  read() {
    return this.repo.readAll();
  }

  readById(id: Id) {
    return this.repo.read(id);
  }

  create(item: Item) {
    return this.repo.create(item);
  }
}

@Resource('items')
class ItemResource {
  constructor(private readonly service: ItemService) {}

  @Get()
  getAll() {
    return this.service.read();
  }

  @Get(':id')
  async getById({ params }: Request<{ id: Id }>) {
    const item = await this.service.readById(params.id);

    if (!item) throw new NotFoundException('Not found');

    return item;
  }

  @Post()
  create(req: Request) {
    return this.service.create(req.body);
  }
}

const itemResource = ResourceFactory.create(ItemResource);

app.use(itemResource.getRouter());
```

`LocalRepo` is an in-memory repository useful for testing and development; swap it for your own `@Repo`-decorated class backed by a real database in production.

## CLI

| Command | Description |
| --- | --- |
| `zotto init` | Initialize a new Zotto project: installs pinned dependencies, creates/updates `tsconfig.json`, adds a `start` script, creates `index.ts`, and generates a sample resource |
| `zotto new:resource <name>` | Generate a new resource file from a template |
| `zotto tsconfig` | Create or update `tsconfig.json` with the compiler options Zotto requires (`experimentalDecorators`, `emitDecoratorMetadata`, CommonJS modules) |

### Flags

| Flag | Applies to | Description |
| --- | --- | --- |
| `-y, --yes` | `init`, `tsconfig` | Accept all prompts |
| `-F, --fast` | `init`, `tsconfig` | Skip the confirmation delay |
| `-N, --no-sample` | `init` | Skip generating the sample resource |
| `-e, --explained` | `new:resource` | Add explanatory comments to the generated file |

`zotto init` re-running on an existing project is idempotent: it only installs/repins dependencies that are missing or out of date, and won't overwrite a `start` script you've already customized.

## Requirements

- Node.js with TypeScript, using `experimentalDecorators` and `emitDecoratorMetadata` (set automatically by `zotto init` / `zotto tsconfig`).
- CommonJS module output — `verbatimModuleSyntax` is incompatible with Zotto's DI and is stripped automatically by the CLI.
- Express `^5.1.0` as a peer dependency.

## License

[ISC](LICENSE)
