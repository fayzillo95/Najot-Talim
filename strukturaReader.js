import { readdir } from 'fs/promises';
import path from 'path';

async function getAllFilesAndDirs(dirPath) {
  let entries = await readdir(dirPath, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      results.push(fullPath + path.sep); // Papka nomini '/' yoki '\' bilan tugatamiz
      const subEntries = await getAllFilesAndDirs(fullPath);
      results = results.concat(subEntries);
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }

  return results;
}

const rootDir = './';

getAllFilesAndDirs(rootDir)
  .then(results => {
    console.log('Barcha fayllar va papkalar:');
    results.forEach(item => console.log(item));
  })
  .catch(err => {
    console.error('Xatolik yuz berdi:', err);
  });



// Barcha fayllar va papkalar:

// componentes\
// package.json
// src\
// src\controller\
// src\midllwares\
// src\router\
// src\service\
// src\service\admin\
// src\service\branch\
// src\service\moderator\
// src\service\users\
// src\utils\
// src\utils\helper\
// src\utils\helper\errors\
// src\utils\helper\validation\
// src\utils\resurs\
// src\utils\resurs\componentes\
// src\utils\resurs\logs\
// src\utils\resurs\logs\cleaner_.js
// src\utils\resurs\logs\logger_.js
// src\utils\resurs\logs\LogsFiles\
// src\utils\resurs\logs\LogsFiles\clientErrors\
// src\utils\resurs\logs\LogsFiles\serverErrors\
// src\utils\resurs\logs\reader_.js
// src\utils\resurs\models\
// src\utils\resurs\models\branchModel_.js
// src\utils\resurs\models\courseModel_.js
// src\utils\resurs\models\permissionModel_.js
// src\utils\resurs\models\studentModel_.js
// src\utils\resurs\models\teacheModel_.js
// src\utils\resurs\models\userModel_.js
// strukturaReader.js
