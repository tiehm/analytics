import * as express from 'express';
import * as exphbs from 'express-handlebars';
import { pdf } from './pdf';

export function setup(data: Setup) {
    const app: express.Application = express();
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');

    app.get('/', (req, res) => {
        res.render('index', data);
    });

    app.listen(3000, async () => {
        await pdf();
        console.log('PDF created.');
        process.exit(0);
    });
}
