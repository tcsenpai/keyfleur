"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const cliCommand = 'node dist/cli.js';
describe('CLI (cli.ts)', () => {
    // Ensure the project is built before running CLI tests
    beforeAll(() => {
        try {
            console.log('Building project before CLI tests...');
            (0, child_process_1.execSync)('npm run build', { stdio: 'inherit' });
            console.log('Build successful.');
        }
        catch (error) {
            console.error('Build failed:', error);
            // Optionally, throw the error to stop tests if build is critical
            // throw error;
        }
    });
    it('should output a single key with default options (haiku, haiku, count 1)', () => {
        const output = (0, child_process_1.execSync)(`${cliCommand}`).toString().trim();
        expect(output).toBeDefined();
        expect(output.length).toBeGreaterThan(0);
        expect(output.split('\n').length).toBe(1);
        // Check for haiku structure (three parts separated by hyphens)
        expect(output.split('-').length).toBe(3);
    });
    it('should output the specified number of keys with --count', () => {
        const count = 3;
        const output = (0, child_process_1.execSync)(`${cliCommand} --count ${count}`).toString().trim();
        const keys = output.split('\n');
        expect(keys.length).toBe(count);
        keys.forEach(key => {
            expect(key.length).toBeGreaterThan(0);
            // Default mode is haiku
            expect(key.split('-').length).toBe(3);
        });
    });
    it('should use the specified theme and mode', () => {
        const theme = 'celestial';
        const mode = 'seed';
        const output = (0, child_process_1.execSync)(`${cliCommand} --theme ${theme} --mode ${mode}`).toString().trim();
        expect(output).toBeDefined();
        expect(output.length).toBeGreaterThan(0);
        // Seed format: Word-xxxx (hex)
        const parts = output.split('-');
        expect(parts.length).toBe(2);
        // Cannot directly check THEMES here as CLI is a separate process
        // but we can check the general structure.
        expect(parts[0].length).toBeGreaterThanOrEqual(1); // Word part
        expect(parts[1]).toMatch(/^[0-9a-f]{4}$/); // Hex part
    });
    it('should use the theme alias -t and mode alias -m', () => {
        const theme = 'forest';
        const mode = 'mantra';
        const output = (0, child_process_1.execSync)(`${cliCommand} -t ${theme} -m ${mode} -c 1`).toString().trim();
        expect(output).toBeDefined();
        expect(output.length).toBeGreaterThan(0);
        const parts = output.split('-');
        expect(parts.length).toBe(3); // Mantra: Word-Word-Word
        expect(parts[0]).toBe(parts[1]);
    });
    it('should show help with --help', () => {
        const output = (0, child_process_1.execSync)(`${cliCommand} --help`).toString();
        expect(output).toContain('Options:');
        expect(output).toContain('--theme');
        expect(output).toContain('--mode');
        expect(output).toContain('--count');
    });
    it('should handle invalid theme by defaulting (or as yargs handles it - usually error or default)', () => {
        // yargs by default will show an error message and exit if choices are violated
        // We test that it shows an error or help message for an invalid theme
        try {
            (0, child_process_1.execSync)(`${cliCommand} --theme invalidtheme`);
        }
        catch (error) {
            const stderrOutput = error.stderr.toString();
            expect(stderrOutput).toContain('Invalid values:');
            expect(stderrOutput).toContain('Argument: theme, Given: "invalidtheme"');
        }
    });
    it('should handle invalid mode by defaulting (or as yargs handles it)', () => {
        // yargs by default will show an error message and exit if choices are violated
        try {
            (0, child_process_1.execSync)(`${cliCommand} --mode invalidmode`);
        }
        catch (error) {
            const stderrOutput = error.stderr.toString();
            expect(stderrOutput).toContain('Invalid values:');
            expect(stderrOutput).toContain('Argument: mode, Given: "invalidmode"');
        }
    });
});
