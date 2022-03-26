import React from 'react'
import Select from 'react-select';
import { CenterList } from '../../components/CenterList'
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
    }

    render() {
      let { selected } = this.state
      if (!selected)
        selected = {value : 'ninguna'}

        return (
          <>
            <div className='container px-8 py-8 max-w-none'>
              <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                  <Select options={this.provincias} 
                    value={this.selected}
                    onChange={this.handleChange}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 3,
                      colors: {
                        ...theme.colors,
                        primary25: '#E9BEEE', //HOVER
                        primary50: '#F39EEC', //CLICK
                        primary: '#F39EEC',   //BORDE, SELECCIONADO
                      },
                    })}
                    placeholder='Seleccione una provincia'/>
                </div>
                <div className='col-md-4'></div>
              </div>
            </div>
            <CenterList provincia={selected.value}/>
          </>
        );
      }
}

export {Filter}