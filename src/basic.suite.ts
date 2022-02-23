/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, Path } from '@minimouli/framework'

suite('Basic components', () => {

    test('Input and output', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/input_output.nts')
        ])

        exec.prepareStdin([
            'display',
            'in=1',
            'display',
            'simulate',
            'display',
            'in=0',
            'display',
            'simulate',
            'display',
            'in=U',
            'display',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: U',
            'output(s):',
            '  out: U'
        ], {
            start: 1,
            end: 5
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: U',
            'output(s):',
            '  out: U'
        ], {
            start: 6,
            end: 10
        })

        /* TRUE */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: 1',
            'output(s):',
            '  out: 1'
        ], {
            start: 11,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: 1',
            'output(s):',
            '  out: 1'
        ], {
            start: 16,
            end: 20
        })

        /* FALSE */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 21,
            end: 25
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 26,
            end: 30
        })

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: U',
            'output(s):',
            '  out: U'
        ], {
            start: 31,
            end: 35
        })
    })

    test('Clock', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/clock.nts')
        ])

        exec.prepareStdin([
            'display',
            'simulate',
            'display',
            'cl=0',
            'display',
            'simulate',
            'display',
            'display',
            'simulate',
            'display',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: U',
            'output(s):',
            '  out: U'
        ], {
            start: 1,
            end: 5
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: U',
            'output(s):',
            '  out: U'
        ], {
            start: 6,
            end: 10
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: U',
            'output(s):',
            '  out: U'
        ], {
            start: 11,
            end: 15
        })

        /* FALSE */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 16,
            end: 20
        })

        /* ALTERNATES */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 21,
            end: 25
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: 1',
            'output(s):',
            '  out: 1'
        ], {
            start: 26,
            end: 30
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 31,
            end: 35
        })
    })

    test('True', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/true.nts')
        ])

        exec.prepareStdin([
            'display',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            'output(s):',
            '  out: 1'
        ], {
            start: 1,
            end: 4
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            'output(s):',
            '  out: 1'
        ], {
            start: 5,
            end: 8
        })
    })

    test('False', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/false.nts')
        ])

        exec.prepareStdin([
            'display',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            'output(s):',
            '  out: 0'
        ], {
            start: 1,
            end: 4
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            'output(s):',
            '  out: 0'
        ], {
            start: 5,
            end: 8
        })
    })

})
