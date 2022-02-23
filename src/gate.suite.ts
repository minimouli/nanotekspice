/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, Path } from '@minimouli/framework'

suite('Gates components', () => {

    test('AND gates (4081)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4081_and.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_02=0',
            'in_05=0',
            'in_06=1',
            'in_08=0',
            'in_09=U',
            'in_12=1',
            'in_13=1',
            'display',
            'simulate',
            'display',
            'in_01=U',
            'in_02=U',
            'in_08=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_02: 0',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 0',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: 0', // 0 & 0
            '  out_04: 0', // 0 & 1
            '  out_10: 0', // 0 & U
            '  out_11: 1'  // 1 & 1
        ], {
            start: 31,
            end: 45
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 1',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: U', // U & U
            '  out_04: 0', // 0 & 1
            '  out_10: U', // 1 & U
            '  out_11: 1'  // 1 & 1
        ], {
            start: 46,
            end: 60
        })
    })

    test('OR gates (4071)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4071_or.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_02=0',
            'in_05=0',
            'in_06=1',
            'in_08=0',
            'in_09=U',
            'in_12=1',
            'in_13=1',
            'display',
            'simulate',
            'display',
            'in_01=U',
            'in_02=U',
            'in_08=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_02: 0',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 0',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: 0', // 0 | 0
            '  out_04: 1', // 0 | 1
            '  out_10: U', // 0 | U
            '  out_11: 1'  // 1 | 1
        ], {
            start: 31,
            end: 45
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 1',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: U', // U | U
            '  out_04: 1', // 0 | 1
            '  out_10: 1', // 1 | U
            '  out_11: 1'  // 1 | 1
        ], {
            start: 46,
            end: 60
        })
    })

    test('NAND gates (4011)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4011_nand.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_02=0',
            'in_05=0',
            'in_06=1',
            'in_08=0',
            'in_09=U',
            'in_12=1',
            'in_13=1',
            'display',
            'simulate',
            'display',
            'in_01=U',
            'in_02=U',
            'in_08=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_02: 0',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 0',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: 1', // !0 | !0
            '  out_04: 1', // !0 | !1
            '  out_10: 1', // !0 | !U
            '  out_11: 0'  // !1 | !1
        ], {
            start: 31,
            end: 45
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 1',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: U', // !U | !U
            '  out_04: 1', // !0 | !1
            '  out_10: U', // !1 | !U
            '  out_11: 0'  // !1 | !1
        ], {
            start: 46,
            end: 60
        })
    })

    test('NOR gates (4001)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4001_nor.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_02=0',
            'in_05=0',
            'in_06=1',
            'in_08=0',
            'in_09=U',
            'in_12=1',
            'in_13=1',
            'display',
            'simulate',
            'display',
            'in_01=U',
            'in_02=U',
            'in_08=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_02: 0',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 0',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: 1', // !0 & !0
            '  out_04: 0', // !0 & !1
            '  out_10: U', // !0 & !U
            '  out_11: 0'  // !1 & !1
        ], {
            start: 31,
            end: 45
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 1',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: U', // !U & !U
            '  out_04: 0', // !0 & !1
            '  out_10: 0', // !1 & !U
            '  out_11: 0'  // !1 & !1
        ], {
            start: 46,
            end: 60
        })
    })

    test('XOR gates (4030)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4030_xor.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_02=0',
            'in_05=0',
            'in_06=1',
            'in_08=0',
            'in_09=U',
            'in_12=1',
            'in_13=1',
            'display',
            'simulate',
            'display',
            'in_01=U',
            'in_02=U',
            'in_08=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        /* UNDEFINED */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: U',
            '  in_06: U',
            '  in_08: U',
            '  in_09: U',
            '  in_12: U',
            '  in_13: U',
            'output(s):',
            '  out_03: U',
            '  out_04: U',
            '  out_10: U',
            '  out_11: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_02: 0',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 0',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: 0', // 0 ^ 0
            '  out_04: 1', // 0 ^ 1
            '  out_10: U', // 0 ^ U
            '  out_11: 0'  // 1 ^ 1
        ], {
            start: 31,
            end: 45
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_02: U',
            '  in_05: 0',
            '  in_06: 1',
            '  in_08: 1',
            '  in_09: U',
            '  in_12: 1',
            '  in_13: 1',
            'output(s):',
            '  out_03: U', // U ^ U
            '  out_04: 1', // 0 ^ 1
            '  out_10: U', // 1 ^ U
            '  out_11: 0'  // 1 ^ 1
        ], {
            start: 46,
            end: 60
        })
    })

    test('NOT gates (4069)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4069_not.nts')
        ])

        exec.prepareStdin([
            'display',
            'in_01=0',
            'in_03=1',
            'in_05=U',
            'in_09=U',
            'in_11=1',
            'in_13=0',
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
            '  in_01: U',
            '  in_03: U',
            '  in_05: U',
            '  in_09: U',
            '  in_11: U',
            '  in_13: U',
            'output(s):',
            '  out_02: U',
            '  out_04: U',
            '  out_06: U',
            '  out_08: U',
            '  out_10: U',
            '  out_12: U'
        ], {
            start: 1,
            end: 15
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: U',
            '  in_03: U',
            '  in_05: U',
            '  in_09: U',
            '  in_11: U',
            '  in_13: U',
            'output(s):',
            '  out_02: U',
            '  out_04: U',
            '  out_06: U',
            '  out_08: U',
            '  out_10: U',
            '  out_12: U'
        ], {
            start: 16,
            end: 30
        })

        /* RESULTS */
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_01: 0',
            '  in_03: 1',
            '  in_05: U',
            '  in_09: U',
            '  in_11: 1',
            '  in_13: 0',
            'output(s):',
            '  out_02: 1', // !0
            '  out_04: 0', // !1
            '  out_06: U', // !U
            '  out_08: U', // !U
            '  out_10: 0', // !1
            '  out_12: 1'  // !0
        ], {
            start: 31,
            end: 45
        })
    })

})
