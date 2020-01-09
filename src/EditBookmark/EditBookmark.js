import React, { Component } from 'react'
import config from '../config'
import './EditBookmark.css'
import { Link } from 'react-router-dom'
import BookmarksContext from '../BookmarksContext'

class EditBookmark extends Component {
  state = {
    id: '',
    title: '',
    url: '',
    description: '',
    rating: '',
    error: null
  }

  static contextType = BookmarksContext

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => res.json())
      .then(responseData => {
        this.setState({
          id:responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating
        })
      })
      .catch(error => this.setState( {error: error.message}))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleEditSubmit = e => {
    e.preventDefault()
    const bookmarkId = this.props.match.params.bookmarkId
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating }

    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(this.state)
    })      
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {     
          throw error
        })
      }
    })
    .then( () => this.context.updateBookmark(newBookmark))
    .then(this.props.history.goBack())
    .catch(error => this.setState( {error: error.message}))
  }

  render() {
    return (
      <section className="EditBookmarkForm">
        <h2>Edit Bookmark</h2>
        <form onSubmit={this.handleEditSubmit} className="EditBookmark">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://www.great-website.com/"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={this.state.rating}
              min="1"
              max="5"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="EditBookmarkButtons">
            <button className="EditBookmarkSubmit">Submit</button>
            <Link to="/">
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    )
  }
}

export default EditBookmark
