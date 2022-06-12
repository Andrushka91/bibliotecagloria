import { useContext } from 'react'
import { Context as BookContext } from '../context/BooksContext'


export default () => {
  const { createBook } = useContext(BookContext)
  const { state: { name } } = '';

  const saveBook= async () => {
    await createBook(name)
  }

  return [saveBook]
}