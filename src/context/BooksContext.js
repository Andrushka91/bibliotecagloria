import createDataContext from './createDataContext'
import booksApi from '../api/books'

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_books':
      return action.payload
    case 'search_book':
      return action.payload
    case 'empty_cart':
      return action.payload
    default:
      return state
  }
}
const searchBook = dispatch => async (title, refreshList) => {
  console.log("searchedTitle:", title);
  refreshList(true);
  const res = await booksApi.get('/search', { params: { title } })
  dispatch({ type: 'search_book', payload: res.data })
  refreshList(false);
}

const fetchBooks = dispatch => async () => {
  const res = await booksApi.get('/books')
  dispatch({ type: 'fetch_books', payload: res.data })
}

const addBook = dispatch => async (name) => {
  await booksApi.post('/book', { name })
}

export const { Provider, Context } = createDataContext(
  bookReducer,
  { addBook, fetchBooks, searchBook },
  []
)