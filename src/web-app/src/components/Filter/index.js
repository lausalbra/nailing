import React from 'react'
import Select from 'react-select';
import {json_provincias} from './provincias'
//npm install react-select --save
class Filter extends React.Component {

    constructor() {
      super()
      this.provincias = json_provincias
      this.state = {
        selected : null
      }
    }

    handleChange = (selected) => {
      this.setState({ selected })
      console.log(selected.value)
    }

    render() {
      const { selected } = this.state

        return (
          <div className='container'>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6'>
                <Select options={this.provincias} 
                  value={this.selected}
                  onChange={this.handleChange}
                  placeholder='Seleccione una provincia'/>
              </div>
              <div className='col-md-4'></div>
            </div>
          </div>
        );
      }
}

export {Filter}