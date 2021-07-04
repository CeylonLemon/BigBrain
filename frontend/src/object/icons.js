import React from 'react'
import PropTypes from 'prop-types';
export function Delete ({ style, handleDelete }) {
  const id = String(Math.random())
  React.useEffect(() => {
    const dom = document.getElementById(id)
    dom.addEventListener('click', (e) => {
      console.log(e.target)
      e.stopPropagation()
      handleDelete()
    })
  }, [])
  return <svg id = {id} className="icon" style={style} t="1624604185739" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2374" width="200" height="200">
        <path
            d="M325.15072 142.73024h366.40768a27.8528 27.8528 0 1 0 0-55.70048H325.15072a27.8528 27.8528 0 1 0 0 55.70048zM919.2704 227.328H109.85472a27.8528 27.8528 0 1 0 0 55.70048h85.9136v573.47072A80.7168 80.7168 0 0 0 276.52608 936.96h474.00448a80.71168 80.71168 0 0 0 80.75776-80.48128V283.01312h87.98208a27.8528 27.8528 0 1 0 0-55.68512z m-143.872 629.18656a24.85248 24.85248 0 0 1-24.86784 24.7808H276.52608a24.84736 24.84736 0 0 1-24.86784-24.7808V283.01312h523.74016v573.48608z"
            fill="#2966C1" p-id="2375"></path>
        <path
            d="M427.6736 750.78656a28.16 28.16 0 0 1-28.24192-28.0832V443.93984a28.24192 28.24192 0 0 1 56.48384 0v278.76352a28.16 28.16 0 0 1-28.24192 28.0832z m186.1888 0a28.16 28.16 0 0 1-28.24192-28.0832V443.93984a28.24192 28.24192 0 0 1 56.48384 0v278.76352a28.16 28.16 0 0 1-28.21632 28.0832z"
            fill="#FD9A16" p-id="2376"></path>
    </svg>
}
Delete.propTypes = {
  style: PropTypes.object,
  handleDelete: PropTypes.func
}

export function Play ({ style, handlePlay }) {
  return <svg className="icon" style={style} onClick={(e) => { handlePlay() }} t="1624604628164" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3187" width="200" height="200">
        <path
            d="M512 12.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2a496.4864 496.4864 0 0 0 424.6528-236.6976l3.2256-5.2736c3.5328-5.888 6.9632-11.776 10.2912-17.8688a38.5024 38.5024 0 0 0-15.0016-52.224 38.6048 38.6048 0 0 0-52.224 15.0016 407.04 407.04 0 0 1-8.8064 15.2576l-2.816 4.6592A419.9936 419.9936 0 0 1 512 934.4c-232.9088 0-422.4-189.4912-422.4-422.4S279.1424 89.6 512 89.6s422.4 189.4912 422.4 422.4a38.4 38.4 0 0 0 76.8 0c0-275.2512-223.9488-499.2-499.2-499.2z"
            fill="#438CFF" p-id="3188"></path>
        <path
            d="M425.6256 297.728a38.4 38.4 0 0 0-57.6 33.28v361.984a38.2976 38.2976 0 0 0 57.6 33.2288l313.5488-180.992a38.4 38.4 0 0 0 0-66.4576L425.6256 297.728z m19.2 328.7552V397.5168L643.1744 512l-198.3488 114.4832z"
            fill="#438CFF" p-id="3189"></path>
    </svg>
}
Play.propTypes = {
  handlePlay: PropTypes.func,
  style: PropTypes.object
}
export function Edit ({ style, handleEdit }) {
  // return <svg class="icon" style={style} t="1624604829400" className="icon" viewBox="0 0 1024 1024" version="1.1"
  //             xmlns="http://www.w3.org/2000/svg" p-id="4020" width="200" height="200">
  //     <path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="4021"></path>
  //     <path
  //         d="M817.664 918.656H124.672A34.56 34.56 0 0 1 89.6 883.968v-614.4a34.688 34.688 0 0 1 34.56-34.688h264.064a34.688 34.688 0 1 1 0 69.248H159.232v545.28h623.872V576.896a34.688 34.688 0 1 1 69.248 0v307.2a34.688 34.688 0 0 1-34.688 34.56z"
  //         fill="#0082FD" p-id="4022"></path>
  //     <path
  //         d="M755.7248 185.1264l98.56 98.56-394.3424 394.3552-98.56-98.56zM350.848 692.352a3.584 3.584 0 0 1-3.84-3.84l7.936-99.712 95.616 95.616z"
  //         fill="#0082FD" p-id="4023"></path>
  //     <path d="M864.256 175.104m-69.76 0a69.76 69.76 0 1 0 139.52 0 69.76 69.76 0 1 0-139.52 0Z" fill="#ABE3FF"
  //           p-id="4024"></path>
  // </svg>
  return <svg t="1624624574705" style={style} onClick={() => { handleEdit() }} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="3078" width="200" height="200">
        <path
            d="M514.510452 117.859097a31.843097 31.843097 0 0 1 3.699613 63.454968l-3.699613 0.231225H177.152c-55.163871 0-101.67329 50.209032-104.613161 114.952258l-0.132129 6.507355v521.249032c0 65.668129 44.725677 118.024258 99.261935 121.327484l5.483355 0.165162h554.677677c55.163871 0 101.67329-50.209032 104.613162-114.952258l0.165161-6.507355V503.411613a31.843097 31.843097 0 0 1 63.454968-3.699613l0.231226 3.699613v320.875355c0 99.063742-71.019355 181.148903-161.792 184.980645l-6.672517 0.165161H177.152c-91.664516 0-164.897032-79.739871-168.332387-177.944774l-0.099097-7.201032V303.037935c0-99.096774 71.019355-181.181935 161.758968-185.046709l6.672516-0.132129h337.358452z m-103.12671 414.422709l90.078968 90.078968-95.95871 26.161549a16.516129 16.516129 0 0 1-20.810323-17.341936l0.528517-2.939871 26.161548-95.95871zM841.761032 101.937548l90.078968 90.045936L523.99071 599.865806l-90.078968-90.045935L841.761032 101.937548z m101.739355-78.385548l66.725161 66.725161a16.516129 16.516129 0 0 1 0 23.320774L954.301935 169.488516l-90.045935-90.078968L920.146581 23.552a16.516129 16.516129 0 0 1 23.353806 0z"
            fill="#3586FF" p-id="3079"></path>
    </svg>
}
Edit.propTypes = {
  style: PropTypes.object,
  handleEdit: PropTypes.func
}
