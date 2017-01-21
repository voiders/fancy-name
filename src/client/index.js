import React from 'react'
import ReactDOM from 'react-dom'

import './style/index.styl'

let url = '/api/auth/twitter'
let newTab
let intervalID

const onClick = function () {
  newTab = window.open(url)
  intervalID = setInterval(intervalClose, 200)
}

const intervalClose = function () {
  if (!newTab.closed) return
  console.log('login')
  clearInterval(intervalID)
}

ReactDOM.render(<div>
  <a onClick={onClick} className='button button-outline'>aaaa</a>
</div>, document.getElementById('root'))
