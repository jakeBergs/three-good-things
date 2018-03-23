import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddThings extends Component {
  constructor() {
    super()

    this.state = {
      things: ['', '', '']
    }
  }

  render() {
    return (
      <div>
        <ol>
          {
            this.state.things.map(thing => {
              return (
                <li key={thing}>
                  <input type="text" value={thing} />
                </li>
              )
            })
          }
          <li>
            <input type="text" value={this.state.things[0]} />
          </li>
        </ol>
      </div>
    )
  }
}
