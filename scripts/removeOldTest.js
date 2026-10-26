const fs = require('fs-extra');
const path = require('path');

async function removeOldTests(directory) {
    try {
        // Считываем содержимое директории рекурсивно
        const files = await fs.readdir(path.join(directory));
        // console.log(directory)

        const oldTests = new Set();
        const newTests = new Set();

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                // Рекурсивно обрабатываем вложенные директории
                await removeOldTests(filePath);
            } else {
                const baseName = path.basename(file, path.extname(file));

                // console.log(baseName,file);
                
                if (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) {
                    oldTests.add( path.basename(baseName, path.extname(baseName)));
                } else if (file.endsWith('.unit.ts') || file.endsWith('.unit.tsx')) {
                    newTests.add( path.basename(baseName, path.extname(baseName)));
                }
            }
        }

        // Определяем старые тесты, которые нужно удалить
        const testsToDelete = [...oldTests].filter(oldTest => newTests.has(oldTest));
        console.log(oldTests);
        console.log(newTests);

        for (const test of testsToDelete) {
            const oldTestPathTs = path.join(directory, `${test}.test.ts`);
            const oldTestPathTsx = path.join(directory, `${test}.test.tsx`);

            // Удаляем файл, если он существует
            if (await fs.pathExists(oldTestPathTs)) {
                await fs.remove(oldTestPathTs);
                console.log(`Удален: ${oldTestPathTs}`);
            }

            if (await fs.pathExists(oldTestPathTsx)) {
                await fs.remove(oldTestPathTsx);
                console.log(`Удален: ${oldTestPathTsx}`);
            }
        }

    } catch (err) {
        console.error('Ошибка:', err);
    }
}

// Укажите путь к корневой директории проекта
const rootDirectoryPath = './src';
removeOldTests(rootDirectoryPath);