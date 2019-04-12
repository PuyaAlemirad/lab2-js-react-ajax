import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import Book from './components/ui/Book/Book'
import MyForm from './components/ui/MyForm/MyForm'
import BookTable from './components/ui/BookTable/BookTable'

const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?'


class App extends Component {
  constructor() {
    super()
    this.state = {
      title: "",
      author: "",
      books: [],
      id: ""

    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickSelect = this.handleClickSelect.bind(this)
  }


  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleChangeAuthor(event) {
    this.setState({
      author: event.target.value
    })
  }

  handleSubmit(event) {

    event.preventDefault()
    this.infoSubmit()


  }

  infoSubmit(limit = 10, count = 1) {
    const storedKey = localStorage.getItem('API-ny')
    if (storedKey) {

      fetch(`${url}key=${storedKey}&op=insert&title=${this.state.title}&author=${this.state.author}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            this.setState({ title: '', author: '', books:[...this.state.books, {id: data.id, title: this.state.title, author: this.state.author}] })

            console.log("Bok lades till efter: " + count + " försök")
            this.handleClickSelect()


          } else {
            if (limit > 0) {
              console.log("Boken lades inte till: " + data.status + " : " + data.message)
              this.infoSubmit(limit - 1, count + 1)
            }
          }
        })

    } else {

      fetch(`${url}requestKey`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {

            localStorage.setItem('API-ny', data.key)
            console.log("lagrar key vid submit" + storedKey)
          } else {
            console.log("Fel vid hämtning av api-nyckel" + data.status + " : " + data.message)
          }
        }
        )

      fetch(`${url}key=${storedKey}&op=insert&title=${this.state.title}&author=${this.state.author}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            this.setState({ title: '', author: '' , books:[...this.state.books, {id: data.id, title: this.state.title, author: this.state.author}] })

            console.log("Bok lades till efter: " + count + "försök")

          } else {
            if (limit > 0) {
              console.log("Boken lades inte till: " + data.status + " : " + data.message)
              this.infoSubmit(limit - 1, count + 1)
            }
          }
        })
    }
  }




  getApiKey() {

    fetch(`${url}requestKey`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          localStorage.setItem('API-ny', data.key)
        } else {
          console.log("Fel vid hämtning av api-nyckel" + data.status + " : " + data.message)
        }
      })
  }

  handleClickSelect(limit = 10, count = 1) {

    const storedKey = localStorage.getItem('API-ny')
    if (storedKey) {

      fetch(`${url}key=${storedKey}&op=select`)
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            this.setState({ books: data.data })
            this.state.books.forEach(e => console.log(e))

            console.log("Böcker hämtades efter: " + count + " försök!")
          }
          else {
            if (limit > 0) {
              console.log("Böcker kunde inte hämtas: " + data.status + " : " + data.message)
              this.handleClickSelect(limit - 1, count + 1)
            } else {
              console.log("Böcker kunde inte hämtas: " + data.status + " : " + data.message)

            }

          }
        })


    } else {

      fetch(`${url}requestKey`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            localStorage.setItem('API-ny', data.key)
          } else {
            console.log("Fel vid hämtning av api-nyckel" + data.status + " : " + data.message)
          }
        })
     fetch(`${url}key=${storedKey}&op=select`)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          this.setState({ books: data.data })
          this.state.books.forEach(e => console.log(e))

          console.log("Böcker hämtades efter: " + count + " försök!")
        }
        else {
          if (limit > 0) {
            console.log("Böcker kunde inte hämtas: " + data.status + " : " + data.message)
            this.handleClickSelect(limit - 1, count + 1)
          } else {
            console.log("Böcker kunde inte hämtas: " + data.status + " : " + data.message)

          }

        }
      })



  }

  }
  componentDidMount() {
    this.handleClickSelect()
  }

  render() {

    const bookList = this.state.books.map(book => {
      return <Book key={book.id}{...book}
        getApiKey={this.getApiKey}
      />
    })

    return (
      <div className="App">
        <Header />

        <main>

          <div className="container">
            <div className="row form-section">
              <MyForm handleSubmit={this.handleSubmit}
                handleChangeTitle={this.handleChangeTitle}
                handleChangeAuthor={this.handleChangeAuthor}
                title={this.state.title}
                author={this.state.author} />
            </div>
          </div>
          <BookTable bookList={bookList} />

        </main>

        }
      }
        </div>

    )
  }
}


export default App
