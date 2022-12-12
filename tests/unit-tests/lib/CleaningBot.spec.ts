import 'jest';
import handleCommand from '../../../src/lib/CleaningBot';


describe('Cleaning bot', () => {


    it('Testing empy input', () => {
        const input = {
            start: {
                x: 0, y: 0
            },
            commands: []
        };
        const actual = handleCommand(input.start, input.commands);
        const expected = {
            result: 1,
            commands: 0
        };

        expect(actual).toEqual(expected);
    });

    it('Testing longer input', () => {
        const input: any = {
            start: {
                x: -10, y: -10
            },
            commands: [{
                direction: 'north',
                steps: 10
            }, {
                direction: 'east',
                steps: 10
            }, {
                direction: 'west',
                steps: 10
            }, {
                direction: 'south',
                steps: 10
            }]
        };
        const actual = handleCommand(input.start, input.commands);
        const expected = {
            result: 3,
            commands: 4
        };

        expect(actual).toEqual(expected);
    });

});
