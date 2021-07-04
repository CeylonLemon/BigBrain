import React from 'react';
import './App.css';
import Divider from '@material-ui/core/Divider';
import CustomizedSwitches from './Switch';
import { ShadowButton } from './Button';
// import { IdDom } from './helpers';
import Row from './Row.js'
// import { UserContext } from '../helper/UserContext';
// import PopupWrapper from './PopupWrapper';
import PropTypes from 'prop-types';
// import { BrowserRouter as Router,Route } from 'react-router-dom';
// import { SmallTextFields } from './TextFiled';

export const turn = {
  off: (dom) => {
    dom.dataset.selected = 'on'
    dom.style.background = 'lightcyan'
  },
  on: (dom) => {
    dom.dataset.selected = 'off'
    dom.style.background = ''
  },
  allOn: () => {
    const rows = document.getElementsByClassName('row')
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.background = 'lightcyan'
      rows[i].dataset.selected = 'on'
    }
  },
  allOff: () => {
    const rows = document.getElementsByClassName('row')
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.background = ''
      rows[i].dataset.selected = 'off'
    }
  }
}

export default function Table ({ rows }) {
  // const { games } = React.useContext(UserContext)
  //
  // const headerRow = ['ID', 'TITLE', 'QUESTIONS', 'DURATION', 'BUTTON']
  // const header = React.useMemo(() => {
  //   return headerRow
  // }, [headerRow])

  // const headerStyle = React.useMemo(() => { return { margin: '0 2vh 0 2vh' } }, [rows[0]])

  // const [rows, setRows] = React.useState(initRows(games));

  const multiDelete = () => {
    console.log('multi')
  }
  const tableStyle = {
    boxShadow: '1px 1px 5px black',
    minWidth: '400px',
    minHeight: '300px',
    width: '80%'
  };
  // const eventCallBack = (e) => {
  //   e.stopPropagation()
  //   console.log(this)
  //   const state = this.dataset.selected
  //   turn[state](this)
  // }
  // React.useEffect(() => {
  //   setRows(initRows(games))
  //   const rows = document.getElementsByClassName('row')
  //
  //   for (let i = 1; i < rows.length; i++) {
  //     const dom = new IdDom(rows[i])
  //     console.log(dom.dom)
  //     dom.clearListener('click', eventCallBack)
  //     dom.addListener({
  //       eventType: 'click',
  //       callBack: eventCallBack
  //     })
  //   }
  // }, [rows])
  return (
        <div>
            <div style={tableStyle} className='table'>
                {/* <Row key={rows[0]} row={header} style={headerStyle}/> */}
                <Divider variant="middle"/>

                {rows.map((r) => (
                    <Row key={r[0]} row={r} />
                ))}

                <Divider variant="middle" style={{ marginBottom: '2vh' }}/>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CustomizedSwitches/>
                    <ShadowButton
                        text={'NEW QUIZ'}
                        style={{
                          position: 'relative',
                          margin: '0 2vh 2vh 0',
                          border: 'none',
                          background: 'none',
                          boxShadow: '0.5px 0.5px 2px black',
                          left: '3%'
                        }}
                        clickHandler={multiDelete}
                    />
                    <ShadowButton
                        text={'DELETE'}
                        style={{
                          margin: '0 2vh 2vh 0',
                          position: 'relative',
                          right: '10%',
                          border: 'none',
                          background: 'none',
                          boxShadow: '0.5px 0.5px 2px black'
                        }}
                        clickHandler={multiDelete}
                    />
                </div>

            </div>

        </div>

  );
}
Table.propTypes = {
  rows: PropTypes.array,
}
