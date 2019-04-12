import React from 'react'

export default function (props) {
    return (
        <div className="display-books">
            <div className="container">
                <div className="col-12">
                    <ul className="list-group">
                        {props.bookList}
                    </ul>
                </div>
            </div>
        </div>
    )
}
