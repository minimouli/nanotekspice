/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, Path } from '@minimouli/framework'

suite('Circuit', () => {

    test('AND gates (4081)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/circuit/and.nts')
        ])

        exec.prepareStdin([
            'in_a=0',
            'in_b=0',
            'in_c=0',
            'in_d=0',
            'in_e=0',
            'simulate',
            'display',
            'in_a=1',
            'in_b=1',
            'in_c=1',
            'in_d=1',
            'in_e=1',
            'simulate',
            'display',
            'in_d=0',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* e & d & c & b & a */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 0',
            '  in_d: 0',
            '  in_e: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 1,
            end: 9
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 1',
            '  in_d: 1',
            '  in_e: 1',
            'output(s):',
            '  out: 1'
        ], {
            start: 10,
            end: 18
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 1',
            '  in_d: 0',
            '  in_e: 1',
            'output(s):',
            '  out: 0'
        ], {
            start: 19,
            end: 27
        })
    })

    test('XOR, NOT gates (4030, 4069)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/circuit/xor_not.nts')
        ])

        exec.prepareStdin([
            'in_a=0',
            'in_b=0',
            'in_c=0',
            'in_d=0',
            'in_e=0',
            'simulate',
            'display',
            'in_c=1',
            'simulate',
            'display',
            'in_a=1',
            'in_c=0',
            'in_e=1',
            'simulate',
            'display',
            'in_a=0',
            'in_b=U',
            'in_e=0',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* !(!(!(a ^ b) ^ (!d ^ c)) ^ e) */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 0',
            '  in_d: 0',
            '  in_e: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 1,
            end: 9
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 1',
            '  in_d: 0',
            '  in_e: 0',
            'output(s):',
            '  out: 1'
        ], {
            start: 10,
            end: 18
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 1',
            '  in_b: 0',
            '  in_c: 0',
            '  in_d: 0',
            '  in_e: 1',
            'output(s):',
            '  out: 0'
        ], {
            start: 19,
            end: 27
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: U',
            '  in_c: 0',
            '  in_d: 0',
            '  in_e: 0',
            'output(s):',
            '  out: U'
        ], {
            start: 28,
            end: 36
        })
    })

    test('AND, OR, NOT gates (4069, 4071, 4081)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/circuit/and-or-not.nts')
        ])

        exec.prepareStdin([
            'in_a=0',
            'in_b=0',
            'in_c=0',
            'simulate',
            'display',
            'in_a=1',
            'simulate',
            'display',
            'in_a=U',
            'in_b=1',
            'in_c=1',
            'simulate',
            'display',
            'in_a=0',
            'in_b=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* // !(!!a | !b) & c */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 1,
            end: 7
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 1',
            '  in_b: 0',
            '  in_c: 0',
            'output(s):',
            '  out: 0'
        ], {
            start: 8,
            end: 14
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: U',
            '  in_b: 1',
            '  in_c: 1',
            'output(s):',
            '  out: U'
        ], {
            start: 15,
            end: 21
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a: 0',
            '  in_b: 1',
            '  in_c: 1',
            'output(s):',
            '  out: 1'
        ], {
            start: 22,
            end: 28
        })
    })

    test('Flip-flop RS (4001, sequential)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/circuit/flip-flop-rs.nts')
        ])

        exec.prepareStdin([
            'in_reset=0',
            'in_set=1',
            'simulate',
            'display',
            'simulate',
            'display',
            'in_reset=1',
            'simulate',
            'display',
            'in_reset=0',
            'simulate',
            'display',
            'in_set=0',
            'simulate',
            'display',
            'in_reset=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 0',
            '  in_set: 1',
            'output(s):',
            '  out_q: 1',
            '  out_qb: 0'
        ], {
            start: 1,
            end: 7
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 0',
            '  in_set: 1',
            'output(s):',
            '  out_q: 1',
            '  out_qb: 0'
        ], {
            start: 8,
            end: 14
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 1',
            '  in_set: 1',
            'output(s):',
            '  out_q: 0',
            '  out_qb: 0'
        ], {
            start: 15,
            end: 21
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 0',
            '  in_set: 1',
            'output(s):',
            '  out_q: 1',
            '  out_qb: 0'
        ], {
            start: 22,
            end: 28
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 0',
            '  in_set: 0',
            'output(s):',
            '  out_q: 1',
            '  out_qb: 0'
        ], {
            start: 29,
            end: 35
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_reset: 1',
            '  in_set: 0',
            'output(s):',
            '  out_q: 0',
            '  out_qb: 1'
        ], {
            start: 36,
            end: 42
        })
    })

})
