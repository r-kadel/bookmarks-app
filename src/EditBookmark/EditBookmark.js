import React, { Component } from 'react'
import config from '../config'

class EditBookmark extends Component {
  state = {
    title: '',
    url: '',
    description: '',
    rating: ''
  }

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
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { title, url, description, rating } = this.state

      return (
         <section className="EditArticleForm">
        <h2>Edit Bookmark</h2>
        <form>
         
        </form>
         <input
         id="title"
         type="text"
         name='title'
         placeholder='title'
         required
         value={title}
         onChange={this.handleChangeTitle}
       />
      </section>
    )
  }
}

export default EditBookmark
