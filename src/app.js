const express = require('express')
const app = express()

app.use(express.json())

let lista = [
  { id: 1, nome: 'Bruno', curso: 'ADS' },
  { id: 2, nome: 'Maria', curso: 'ADS' }
]

// READ (todos) — SELECT * FROM alunos
app.get('/lista', (req, res) => {
  res.status(200).json(lista)
})

// READ (um) — SELECT * FROM alunos WHERE id = ?
app.get('/lista/:id', (req, res) => {
  const id = Number(req.params.id)
  const aluno = lista.find(a => a.id === id)

  if (!aluno) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado' })
  }

  res.status(200).json(aluno)
})

// CREATE — INSERT INTO alunos (...)
app.post('/lista', (req, res) => {
  const { nome, curso } = req.body

  const novoId = lista.length ? lista[lista.length - 1].id + 1 : 1
  const novoAluno = { id: novoId, nome, curso }

  lista.push(novoAluno)

  res.status(201).json(novoAluno)
})

// UPDATE — UPDATE alunos SET ... WHERE id = ?
app.put('/lista/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = lista.findIndex(a => a.id === id)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado' })
  }

  const { nome, curso } = req.body
  lista[index] = { id, nome, curso }

  res.status(200).json(lista[index])
})

// DELETE — DELETE FROM alunos WHERE id = ?
app.delete('/lista/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = lista.findIndex(a => a.id === id)

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado' })
  }

  const [removido] = lista.splice(index, 1)

  res.status(200).json(removido)
})

module.exports = app