import {
    sum_to_n_formula,
    sum_to_n_iterative,
    sum_to_n_recursive
} from './the_way_sum_to_n';

function runTests() {
    const testCases = [
        {input: 1, expected: 1},
        {input: 2, expected: 3},
        {input: 5, expected: 15},
        {input: 10, expected: 55},
        {input: 0, expected: 0},
        {input: 100, expected: 5050},
    ];

    const implementations = [
        {name: "Formula", fn: sum_to_n_formula},
        {name: "Iterative", fn: sum_to_n_iterative},
        {name: "Recursive", fn: sum_to_n_recursive},
    ];

    for(const {name, fn} of implementations) {
        for(const {input, expected} of testCases) {
            const result = fn(input);
            console.assert(
                result === expected,
                `${ name } failed for input ${ input }: expected ${ expected }, got ${ result }`
            );
        }
    }

    console.log("All tests passed!");
}

runTests();