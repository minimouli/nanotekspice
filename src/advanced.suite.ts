/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, Path } from '@minimouli/framework'

suite('Advanced components', () => {

    test('4-bits Adder (4008)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4008_adder.nts')
        ])

        exec.prepareStdin([
            'in_a1=0',
            'in_b1=0',
            'in_a2=0',
            'in_b2=0',
            'in_a3=0',
            'in_b3=0',
            'in_a4=0',
            'in_b4=0',
            'in_c=0',
            'simulate',
            'display',
            'in_b1=1',
            'in_a3=1',
            'in_b3=1',
            'in_a4=1',
            'in_b4=1',
            'in_c=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a1: 0',
            '  in_a2: 0',
            '  in_a3: 0',
            '  in_a4: 0',
            '  in_b1: 0',
            '  in_b2: 0',
            '  in_b3: 0',
            '  in_b4: 0',
            '  in_c: 0',
            'output(s):',
            '  out_0: 0', // 0 + 0 + 0
            '  out_1: 0', // 0 + 0 + 0
            '  out_2: 0', // 0 + 0 + 0
            '  out_3: 0', // 0 + 0 + 0
            '  out_c: 0'  // carry(0 + 0 + 0)
        ], {
            start: 1,
            end: 17
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_a1: 0',
            '  in_a2: 0',
            '  in_a3: 1',
            '  in_a4: 1',
            '  in_b1: 1',
            '  in_b2: 0',
            '  in_b3: 1',
            '  in_b4: 1',
            '  in_c: 1',
            'output(s):',
            '  out_0: 0', // 0 + 1 + 1
            '  out_1: 1', // 0 + 0 + 1
            '  out_2: 0', // 1 + 1 + 0
            '  out_3: 1', // 1 + 1 + 1
            '  out_c: 1'  // carry(1 + 1 + 1)
        ], {
            start: 18,
            end: 34
        })
    })

    test('Decade Counter (4040)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4040_counter.nts')
        ])

        exec.prepareStdin([
            'cl_clock=0',
            'simulate',
            'display',
            'simulate',
            'simulate',
            'simulate',
            'display',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'display',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'display',
            'in_reset=1',
            'simulate',
            'display',
            'in_reset=0',
            'simulate',
            'simulate',
            'simulate',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 0',
            '  in_reset: U',
            'output(s):',
            '  out_00: 1',
            '  out_01: 0',
            '  out_02: 0',
            '  out_03: 0',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 1,
            end: 17
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 1',
            '  in_reset: U',
            'output(s):',
            '  out_00: 0',
            '  out_01: 1',
            '  out_02: 0',
            '  out_03: 0',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 18,
            end: 34
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 1',
            '  in_reset: U',
            'output(s):',
            '  out_00: 1',
            '  out_01: 1',
            '  out_02: 1',
            '  out_03: 0',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 35,
            end: 51
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 1',
            '  in_reset: U',
            'output(s):',
            '  out_00: 1',
            '  out_01: 1',
            '  out_02: 0',
            '  out_03: 1',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 52,
            end: 68
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 0',
            '  in_reset: 1',
            'output(s):',
            '  out_00: 0',
            '  out_01: 0',
            '  out_02: 0',
            '  out_03: 0',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 69,
            end: 85
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  cl_clock: 0',
            '  in_reset: 0',
            'output(s):',
            '  out_00: 0',
            '  out_01: 1',
            '  out_02: 0',
            '  out_03: 0',
            '  out_04: 0',
            '  out_05: 0',
            '  out_06: 0',
            '  out_07: 0',
            '  out_08: 0',
            '  out_09: 0',
            '  out_10: 0',
            '  out_11: 0'
        ], {
            start: 86,
            end: 102
        })
    })

    test('Johnson (4017)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4017_johnson.nts')
        ])

        exec.prepareStdin([
            'in_0=0',
            'in_1=0',
            'in_r=1',
            'simulate',
            'display',
            'in_0=1',
            'in_r=0',
            'simulate',
            'in_0=0',
            'simulate',
            'display',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'display',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'display',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_0=0',
            'simulate',
            'in_0=1',
            'simulate',
            'in_1=1',
            'simulate',
            'in_1=0',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_0: 0',
            '  in_1: 0',
            '  in_r: 1',
            'output(s):',
            '  out_0: 1',
            '  out_1: 0',
            '  out_2: 0',
            '  out_3: 0',
            '  out_4: 0',
            '  out_5: 0',
            '  out_6: 0',
            '  out_7: 0',
            '  out_8: 0',
            '  out_9: 0',
            '  out_s: 1'
        ], {
            start: 1,
            end: 17
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_0: 0',
            '  in_1: 0',
            '  in_r: 0',
            'output(s):',
            '  out_0: 0',
            '  out_1: 1',
            '  out_2: 0',
            '  out_3: 0',
            '  out_4: 0',
            '  out_5: 0',
            '  out_6: 0',
            '  out_7: 0',
            '  out_8: 0',
            '  out_9: 0',
            '  out_s: 1'
        ], {
            start: 18,
            end: 34
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_0: 0',
            '  in_1: 0',
            '  in_r: 0',
            'output(s):',
            '  out_0: 0',
            '  out_1: 0',
            '  out_2: 0',
            '  out_3: 0',
            '  out_4: 1',
            '  out_5: 0',
            '  out_6: 0',
            '  out_7: 0',
            '  out_8: 0',
            '  out_9: 0',
            '  out_s: 1'
        ], {
            start: 35,
            end: 51
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_0: 0',
            '  in_1: 0',
            '  in_r: 0',
            'output(s):',
            '  out_0: 0',
            '  out_1: 0',
            '  out_2: 0',
            '  out_3: 0',
            '  out_4: 0',
            '  out_5: 0',
            '  out_6: 0',
            '  out_7: 1',
            '  out_8: 0',
            '  out_9: 0',
            '  out_s: 0'
        ], {
            start: 52,
            end: 68
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in_0: 1',
            '  in_1: 0',
            '  in_r: 0',
            'output(s):',
            '  out_0: 0',
            '  out_1: 1',
            '  out_2: 0',
            '  out_3: 0',
            '  out_4: 0',
            '  out_5: 0',
            '  out_6: 0',
            '  out_7: 0',
            '  out_8: 0',
            '  out_9: 0',
            '  out_s: 1'
        ], {
            start: 69,
            end: 85
        })
    })

    test('8 Channel Data Selector (4512)', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/single/4512_selector.nts')
        ])

        exec.prepareStdin([
            'in_0=0',
            'in_1=1',
            'in_2=U',
            'in_3=0',
            'in_4=1',
            'in_5=U',
            'in_6=0',
            'in_7=1',
            'inhibit=0',
            'enable=0',
            'in_a=0',
            'in_b=0',
            'in_c=0',
            'simulate',
            'display',
            'in_c=1',
            'simulate',
            'display',
            'in_b=1',
            'in_c=0',
            'simulate',
            'display',
            'in_c=1',
            'simulate',
            'display',
            'in_a=1',
            'in_b=0',
            'in_c=0',
            'simulate',
            'display',
            'in_c=1',
            'simulate',
            'display',
            'in_b=1',
            'in_c=0',
            'simulate',
            'display',
            'in_c=1',
            'simulate',
            'display',
            'inhibit=1',
            'simulate',
            'display',
            'enable=1',
            'simulate',
            'display',
            ''
        ])

        await exec.execute()

        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 0',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 0'
        ], {
            start: 1,
            end: 17
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 0',
            '  in_b: 0',
            '  in_c: 1',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 1'
        ], {
            start: 18,
            end: 34
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 0',
            '  in_b: 1',
            '  in_c: 0',
            '  inhibit: 0',
            'output(s):',
            '  out_data: U'
        ], {
            start: 35,
            end: 51
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 0',
            '  in_b: 1',
            '  in_c: 1',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 0'
        ], {
            start: 52,
            end: 68
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 0',
            '  in_c: 0',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 1'
        ], {
            start: 69,
            end: 85
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 0',
            '  in_c: 1',
            '  inhibit: 0',
            'output(s):',
            '  out_data: U'
        ], {
            start: 86,
            end: 102
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 0',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 0'
        ], {
            start: 103,
            end: 119
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 1',
            '  inhibit: 0',
            'output(s):',
            '  out_data: 1'
        ], {
            start: 120,
            end: 136
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 0',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 1',
            '  inhibit: 1',
            'output(s):',
            '  out_data: 0'
        ], {
            start: 137,
            end: 153
        })
        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  enable: 1',
            '  in_0: 0',
            '  in_1: 1',
            '  in_2: U',
            '  in_3: 0',
            '  in_4: 1',
            '  in_5: U',
            '  in_6: 0',
            '  in_7: 1',
            '  in_a: 1',
            '  in_b: 1',
            '  in_c: 1',
            '  inhibit: 1',
            'output(s):',
            '  out_data: U'
        ], {
            start: 154,
            end: 170
        })
    })

})
