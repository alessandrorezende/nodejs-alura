const LivroDao = require('../infra/livro-dao');
const bd = require('../../config/database');


module.exports = (app) => {
    

app.get('/', function(req, resp) {
    resp.send(
        `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `
    );
});

app.get('/livros', function(req, resp) {

    //Usando classe DAO
    const livroDao = new LivroDao(bd);

    //Usando Promise
    livroDao.lista().then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }

     )).catch(erro => console.log(erro));

    /*Usando funcao callback
    livroDao.lista(function(erro, resultados) {

        resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: resultados
            }

        );

    });
    */

    /*Usando banco de dados para recuperar a lista
    bd.all('SELECT * FROM livros', function(erro, resultados) {
        resp.marko( 
            require('../views/livros/lista.marko') , {
                livros: resultados
            }
        );
    });
    */

    /*
    Passando a lista diretamente
    resp.marko( 
        require('../views/livros/lista.marko') , {
            
            livros: [{id:1 , titulo: 'Fundamentos do Node'},
                     {id:2 , titulo: 'Node Avançado'}
                    ]

        }
    );
    */
});

app.get('/livros/form', function(req, resp) {
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} })
});

app.post('/livros', function(req, resp) { //adicionar um livro
    console.log(req.body);

    const livroDao = new LivroDao(bd);

    livroDao.adiciona(req.body)
    .then(resp.redirect('/livros'))
    .catch(erro => console.log(erro));

});

app.put('/livros', function(req, resp) { //atualizar um livro
    console.log(req.body);

    const livroDao = new LivroDao(bd);

    livroDao.atualiza(req.body)
    .then(resp.redirect('/livros'))
    .catch(erro => console.log(erro));

});

app.delete('/livros/:id', function(req, resp) { //deletar livro
    const id = req.params.id;

    const livroDao = new LivroDao(bd);
    livroDao.remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro));
});

app.get('/livros/form/:id', function(req, resp) { //visualizar um livro
    const id = req.params.id;
    const livroDao = new LivroDao(bd);

    livroDao.buscaPorId(id).then(livro => 
            resp.marko(
                require('../views/livros/form/form.marko'),{ livro: livro }
            )
        )
        .catch(erro => console.log(erro));

});

} 
