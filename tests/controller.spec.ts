describe('Controller', () => {
    it('Should not throw an error', () => {
        // const mock = jest.fn().mockImplementation;
        expect(() => {
            require('../src/classes/resource/resource-params.interface');
            require('../src/classes/resource/resource.abstract');
        }).not.toThrow();
    });
});
