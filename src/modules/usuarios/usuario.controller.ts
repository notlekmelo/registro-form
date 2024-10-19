export const validarGravacao = (body: any, callback: Function) => {
    if (!body.Nome || typeof body.Nome != 'string' || body.Nome.length == 0) {
        callback(false, 'É necessário informar o nome.')
    }
    if (!body.Telefone || typeof body.Telefone != 'string' || body.Telefone.length == 0) {
        callback(false, 'É necessário informar o telefone.')
    }
    if (!body.Email || typeof body.Email != 'string' || body.Email.length == 0) {
        callback(false, 'É necessário informar o e-mail.')
    }
    if (!body.Formulario || typeof body.Formulario != 'string' || body.Formulario.length == 0) {
        callback(false, 'É necessário informar o formulário.')
    }
    else if (body.Nome.includes(';')) {
        callback(false, 'O nome do usuário não pode conter ";"')
    }    
    else if (body.Telefone.includes(';')) {
        callback(false, 'O telefone do usuário não pode conter ";"')
    }    
    else if (body.Email.includes(';')) {
        callback(false, 'O e-mail do usuário não pode conter ";"')
    }    
    else {
        callback(true, null)
    }
}

export const validarParametro = (formulario: string, callback: Function) => {
    if (!formulario) {
        callback(false, 'É necessário informar o formulário.')
    }  
    else {
        callback(true, null)
    }
}