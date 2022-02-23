/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Executable, Path } from '@minimouli/framework'

suite('Parsing', () => {

    test('Whitspaces', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/whitespaces.nts')
        ])

        exec.prepareStdin([
            'display',
            ''
        ])

        await exec.execute()
        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: U',
            'output(s):',
            '  out: U'
        ], {
            start: 1,
            end: 5
        })
    })

    test('Comments', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/comments.nts')
        ])

        exec.prepareStdin([
            'display',
            ''
        ])

        await exec.execute()
        expect(exec).toExitWith(0)

        await expect(exec).concurrent.toOutput([
            'input(s):',
            '  in: U',
            'output(s):',
            '  out: U'
        ], {
            start: 1,
            end: 5
        })
    })

    test('No components', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/no_components.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Empty file', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/empty_file.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Missing component name', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/missing_component_name.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Duplicate name', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/duplicate_name.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Unknown component', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/unknown_component.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Unregistered component #1', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/unregistered_component1.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Unregistered component #2', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/unregistered_component2.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Missing link #1', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/missing_link1.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Missing link #2', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/missing_link2.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Empty pin number #1', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/empty_pin_number1.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Empty pin number #2', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/empty_pin_number2.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('File does not exist', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromMouli('/res/parsing/does_not_exist.nts')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('Binary', async () => {

        const exec = new Executable('nanotekspice', [
            Path.fromProject('nanotekspice')
        ])

        await exec.execute()
        expect(exec).toExitWith(84)
    })

    test('No argument', async () => {

        const exec = new Executable('nanotekspice')

        await exec.execute()
        expect(exec).toExitWith(84)
    })

})
