/* eslint-disable class-methods-use-this */
import Repo from '../../src/decorators/repo.decorator';

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
