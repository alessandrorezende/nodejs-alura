class LivroDao{

    constructor(bd) {
        this._db = bd;
    }
    //Usando Promise
    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                }
            )

        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `,[
                livro.titulo,
                livro.preco,
                livro.descricao
            ], 
            function (err) {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível adicionar o livro!');
                }

                resolve();
            } 
            )

        });
    } 

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id], 
                (err, livro) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível encontrar o livro!');
                    }

                    return resolve(livro);
                } 
            )
        
        });
    }

    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
            UPDATE livros SET titulo = ?, preco = ? , descricao = ? WHERE id = ?
            `,[
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ], 
            function (err) {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível adicionar o livro!');
                }

                resolve();
            } 
            )

        });
    }

    remove(id){
        this._db.run(
            'DELETE FROM livros WHERE id = ?',
            [id], 
            (err) => {
                if (err) {
                    console.log(err);
                    return reject('Não foi possível deletar o livro!');
                }

                return resolve();
            } 
        )
    }


    /*Usando função callback
    lista(callback) {
        this._db.all(
            'SELECT * FROM livros',
            function(erro, resultados) {
                callback(erro, resultados)
                
            }       
        )

    }*/

    
}

module.exports = LivroDao;