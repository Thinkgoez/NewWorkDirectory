import React, { Fragment, useRef, useState } from 'react'
import { Modal } from 'react-native'

import { Separator, StyledButton, StyledView, StyledWithoutFeedback } from '../SimpleComponents'
import ArrowDownIcon from '../../../assets/arrowDown.svg'

const CustomDropDown = ({ wrapperProps, data, defaultValueTitle, onSelect, ...props }) => {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(data.find(el => el.title === defaultValueTitle))
    const [dropDownOffset, setDropDownOffset] = useState({ x: 0, y: 0 })
    const dropDownRef = useRef(null)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSelectItem = (item) => {
        setSelected(item)
        onSelect(item.title)
        handleClose()
    }
    const handleLayout = ({ nativeEvent: { layout, ...rest }, ...props }) => {
        console.log(rest)
        getMeasure()
    }
    const getMeasure = () => {
        if (dropDownRef.current) {
            dropDownRef.current.measure((fx, fy, width, height, px, py) => {
                // fx - frameX, px - pageX
                setDropDownOffset({ x: px , y: py + height })
            })
        }
    }
    const dropDownSelectedIcon = selected?.icon || ArrowDownIcon
    return (
        <>
            <StyledView flexDirection='row' onLayout={handleLayout} ref={dropDownRef}>
                <DropDownItem
                    onPress={handleOpen}
                    size={30}
                    icon={dropDownSelectedIcon}
                    containerStyle={{
                        borderRadius: '10px',
                        border: '1px solid #000'
                    }}
                />
            </StyledView>
            {isOpen
                && (
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={isOpen}
                    >
                        <StyledWithoutFeedback onPress={handleClose}>
                            <StyledView
                                justifyContent='center'
                                alignItems='center'
                                flex={1}
                                backgroundColor='rgba(0,0,0,0.4)'
                            >
                                <StyledView
                                    backgroundColor='#fff'
                                    position='absolute'
                                    borderRadius='5px'
                                    top={dropDownOffset.y + 5 + 'px'}
                                    left={dropDownOffset.x + 5 + 'px'}
                                    flexDirection='row'
                                >
                                    <StyledView
                                        borderTop='5px transparent'
                                        borderRight='5px transparent'
                                        borderLeft='5px transparent'
                                        borderBottom='5px #fff'
                                        // backgroundColor='#fff'
                                        position='absolute'
                                        top='-10px'
                                        left='14px'
                                        width='5px'
                                        height='5px'
                                    />
                                    {data.map((el, index) => (
                                        <Fragment key={el.id + 'dropDownItem'}>
                                            <DropDownItem
                                                onPress={() => handleSelectItem(el)}
                                                icon={el.icon}
                                                selected={el.id === selected?.id}
                                            />
                                            {
                                                index < data.length - 1
                                                    ? <Separator
                                                        position='vertical'
                                                    />
                                                    : null
                                            }
                                        </Fragment>
                                    ))}
                                </StyledView>
                            </StyledView>
                        </StyledWithoutFeedback>
                    </Modal>
                )
            }
        </>
    )
}

const DropDownItem = ({ containerStyle = {}, size = 20, onPress, icon: Icon, selected }) => {
    return (
        <StyledButton
            onPress={onPress}
            paddingVertical='5px'
            paddingHorizontal='10px'
            flexDirection='row'
            alignItems='center'
            backgroundColor={selected ? '#ccc' : 'transparent'}
            borderTop={selected ? '2px #fff' : undefined}
            borderBottom={selected ? '2px #fff' : undefined}
            {...containerStyle}
        >
            {!!Icon && <Icon fill='#000' width={size} height={size} />}
        </StyledButton>
    )
}

export default CustomDropDown