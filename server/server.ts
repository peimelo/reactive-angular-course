import * as express from 'express';
import { Application } from 'express';
import { getAllCourses, getCourseById } from './get-courses.route';
import { loginUser } from './login.route';
import { saveCourse } from './save-course.route';
import { searchLessons } from './search-lessons.route';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/login').post(loginUser);

// nome da pasta dentro de dist que sera feito build, ver angular.json
const appName = 'reactive-angular-course';

// local onde build ira gerar os arquivos
const outputPath = `${__dirname}/${appName}`;

// seta o diretorio de build para servir o conteudo estatico
app.use(express.static(outputPath));

// qualquer requisicao sera direcionada para o index.html no diretorio de build
app.get('/*', (req, res) => {
  res.sendFile(`${outputPath}/index.html`);
});

const port = process.env.PORT || 9000;

const httpServer = app.listen(port, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
      httpServer.address()['port']
  );
});
