import React, { Component } from 'react';
import axios from 'axios';

export default class ListThings extends Component {
  constructor() {
    super();

    this.state = {
      allThings: []
    }
  }

  componentDidMount() {
    // load list of things
    // currently get all but in the future gonna be more filtered
    const { id } = this.props;
    axios.get(`/api/users/${id}/things`)
      .then(res => res.data)
      .then(things => {
        console.log(things)
        this.setState({ allThings: things })
      })
      .catch(console.error)
  }

  render() {
    const { allThings } = this.state;
    console.log(allThings)
    return (
        <table>
          <thead>
            <tr className="thing-table-headers">
              <th className="content-div">Thing</th>
              <th className="date-div">Date</th>
              <th className="sentiment-div">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {allThings.length ? (
              allThings.map(thing => (
                <tr key={thing.id} className="thing-table-row">
                  <td className="content-div">
                    {thing.content}
                  </td>
                  <td className="date-div">
                    {thing.createdAt.substring(5, 7)}/{thing.createdAt.substring(8, 10)}/{thing.createdAt.substring(0, 4)}
                  </td>
                  <td className="sentiment-div">
                    <button>
                      get score
                  </button>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                  <td>No</td>
                  <td>Things</td>
                  <td>Added</td>
                </tr>
              )}
          </tbody>
        </table>
    )
  }
}

