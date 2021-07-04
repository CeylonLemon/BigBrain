import React, { useContext } from 'react';
import { UserContext } from '../helper/UserContext';
import Table from './Table'

function TableWrapper () {
  const { games } = useContext(UserContext);
  const calcTime = (g) => {
    let time = 0;
    if (!g.questions.length) { return 0 }
    g.questions.forEach((q, i) => { time = parseInt(time) + parseInt(q.duration) });
    // this.time = time
    return time;
  }
  const rows = games.map(g => {
    return [g.id, g.name, g.questions.length, calcTime(g), 'button']
  })
  rows.unshift(['ID', 'NAME', 'QUESTIONS', 'DURATION', 'BUTTON'])
  return <div>
      <Table rows={rows}/>
  </div>
}
export default TableWrapper
