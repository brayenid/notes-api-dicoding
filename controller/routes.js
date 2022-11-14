import moment from 'moment'
import notes from '../src/notes.js'
const generateId = () => {
  return Date.now()
}
const routes = [
  {
    method: '*',
    path: '/{any*}',
    handler: () => {
      return { message: 'Halaman tidak dapat diakses dengan method tersebut' }
    },
  },
  {
    method: 'POST',
    path: '/notes',
    handler: (request, h) => {
      const { title, tags, body } = request.payload
      const id = generateId()
      const createdAt = new Date().toISOString()
      const note = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt: createdAt,
      }
      notes.push(note)
      const isSuccess = notes.filter((note) => note.id === id).length > 0
      if (isSuccess) {
        console.log(notes)
        return h
          .response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
              noteId: id,
            },
          })
          .code(200)
      } else {
        console.log('gagal')
        return h.response({ message: 'Not' }).code(400)
      }
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: (request, h) => {
      return h.response({
        status: 'success',
        data: {
          notes: notes,
        },
      })
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: (request, h) => {
      const { id } = request.params
      const getNote = notes.filter((note) => note.id === Number(id))[0]
      if (getNote !== undefined) {
        return {
          status: 'success',
          data: {
            note: getNote,
          },
        }
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      })
      response.code(404)
      return response
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: (request, h) => {
      const { id } = request.params
      const { title, tags, body } = request.payload
      const updatedAt = new Date().toISOString()
      const index = notes.findIndex((note) => note.id === Number(id))
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        }
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        })
        response.code(200)
        return response
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      })
      response.code(404)
      return response
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: (request, h) => {
      const { id } = request.params
      const index = notes.findIndex((note) => note.id === Number(id))
      if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        })
        response.code(200)
        return response
      }
    },
  },
]

export default routes
