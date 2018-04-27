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
      <div>
        <table>
          <thead>
            <tr className="thing-table-headers">
              <th>Thing</th>
              <th>Date</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {allThings.length ? (
              allThings.map(thing => (
                <tr key={thing.id} className="thing-table-row">
                  <td>
                    {thing.content}
                  </td>
                  <td className="date-div">
                    {thing.createdAt.substring(5, 7)}/{thing.createdAt.substring(8, 10)}/{thing.createdAt.substring(0, 4)}
                  </td>
                  <td>
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
      </div>
    )
  }
}

