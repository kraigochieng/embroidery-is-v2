// import { Button, Form, Input, Space, message } from 'antd'
// import React, { useEffect } from 'react'
// import { getColours } from '../../features/colours/coloursSlice'
// import { useDispatch, useSelector } from 'react-redux'

// export default function ColourForm(props) {
//   const [messageApi, contextHolder] = message.useMessage()

//   const {handleFinish} = props

//   const dispatch = useDispatch()
//   const colours = useSelector(state => state.colours.data)

//   useEffect(() => {
//     dispatch(getColours())
//   }, [])

//   function isUnique(_, value) {
//     if(colours.map(colour => colour.name.toLowerCase()).includes(value.toLowerCase())) {
//       return Promise.reject(new Error("Colour already exists"))
//     } else {
//       return Promise.resolve()
//     }
//   }

//   return (
//     <>
//     {contextHolder}
//         <Form onFinish={() => handleFinish()} name='colourForm'>
//         <Space.Compact block>
//           <Form.Item name="name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter a colour name'
//               },
//               {
//                 validator: isUnique
//               }
//             ]}
//           >
//             <Input placeholder='Colour Name'/>
//           </Form.Item>
//           <Button type='primary' htmlType='submit'>Submit</Button>
//         </Space.Compact>
//     </Form>
//     </>


//   )
// }
