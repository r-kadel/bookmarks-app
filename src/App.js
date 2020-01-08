import React, { Component } from 'react'
import AddBookmark from './AddBookmark/AddBookmark'
import BookmarkList from './BookmarkList/BookmarkList'
import EditBookmark from './EditBookmark/EditBookmark'
import Nav from './Nav/Nav'
import config from './config'
import './App.css'
import { Route } from 'react-router-dom'
import BookmarksContext from './BookmarksContext'

class App extends Component {
  state = {
    bookmarks: [],
    error: null
  }

  changePage = page => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    })
  }

  deleteBookmark = id => {
    const updatedBookmarks = this.state.bookmarks.filter(
      bookmark => bookmark.id !== id
    )
    this.setState({
      bookmarks: updatedBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      setBookmarks: this.setBookmarks
    }
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route exact path="/" component={BookmarkList} />
            <Route path="/edit/:bookmarkId" component={EditBookmark} />
          </div>
        </BookmarksContext.Provider>
      </main>
    )
  }
}
export default App
