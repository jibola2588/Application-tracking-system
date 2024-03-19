import styled from 'styled-components'
const IconWrapper = styled.div``

function Icon({icon: Icon, handleClick, width, height, classname}) {
  return (
    <IconWrapper onClick={handleClick} className={`${width ? `w-[${width}] h-[${height}]` : ''} flex items-center justify-center`}>
       <Icon className={classname} />
    </IconWrapper>
  )
}

export default Icon
