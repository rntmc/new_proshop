import {Alert} from 'react-bootstrap'


const Message = ({ variant, children}) => { //variant: danger(red), success(green), children: whatever we are wrapping in
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message