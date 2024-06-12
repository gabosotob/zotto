import { Repo } from '../../src';

/* eslint-disable class-methods-use-this */
@Repo()
export default class StubRepo {
    async find() {
        return [];
    }

    async findOne() {
        return {};
    }

    async create() {
        return {};
    }

    async update() {
        return {};
    }

    async delete() {
        return {};
    }
}
