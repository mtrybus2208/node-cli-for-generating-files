import [PASCAL_DATA] from './[CAMEL_DATA]';

describe('[PASCAL_DATA] Class', () => {
    const template = '<h1>Hello from [PASCAL_DATA] module</h1>';
    let instance = null;

    beforeEach(() => {
        document.body.innerHTML = template;
        instance = new [PASCAL_DATA]();
    });

    describe('constructor', () => {
        test('should create object', () => {
            expect(instance).toBeTruthy();
        });
    });
});
