import app from './app'
import './database'
import dotenv from 'dotenv'
dotenv.config()

function main(){
    app.listen(app.get('PORT'));
    console.log('Server on port',app.get('PORT'))
};

main();
