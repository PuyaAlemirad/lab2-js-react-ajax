import React from 'react'

export default function(props) {
return(<form className="book-form col-6" onSubmit={props.handleSubmit}>
                <legend>Lägg till dina favoritböcker</legend>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={props.title}
                    aria-describedby="title"
                    placeholder="Lägg till titel"
                    onChange={props.handleChangeTitle}
                  />

                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    value={props.author}
                    rows="3"
                    data-gramm="true"
                    data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                    data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                    data-gramm_editor="true"
                    placeholder="Lägg till författare"
                    onChange={props.handleChangeAuthor}

                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Skicka
                </button>
              </form>
              )

}