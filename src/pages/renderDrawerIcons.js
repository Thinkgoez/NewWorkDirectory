import React from 'react'

export { default as ArticlesIcon } from '../assets/articles.svg'
export { default as SummaryIcon } from '../assets/summary.svg'
export { default as CameraIcon } from '../assets/camera.svg'
export { default as MapIcon } from '../assets/marker.svg'
export { default as LoginIcon } from '../assets/login.svg'
export { default as WebViewIcon } from '../assets/webview.svg'
export { default as FingerprintIcon } from '../assets/fingerprint.svg'
export { default as ChartIcon } from '../assets/chart.svg'
export { default as NorificationsIcon } from '../assets/notif.svg'
export { default as SettingsIcon } from '../assets/settings.svg'

import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents'

const SIZE = 24

export const renderContent = ({ descriptors, state }) => {

    const currentKey = state?.history[state?.history.length - 1]?.key || state?.history[state?.history.length - 2]?.key
    const { routes } = state
    return (
        <StyledView flex={1}>
            {routes.map(el => {
                const renderIcon = descriptors[el.key]?.options?.drawerIcon || (() => null)
                const navigate = descriptors[el.key]?.navigation?.navigate
                const title = descriptors[el.key]?.options?.title || el.name
                const Icon = descriptors[el.key]?.options?.Icon || null
                const handlePress = () => {
                    navigate(el.name)
                }
                return (
                    <StyledButton
                        onPress={handlePress}
                        key={el.key}
                        paddingVertical='8px'
                        paddingHorizontal='32px'
                        backgroundColor='#eee'
                        borderBottom='1px #ccc'
                        marginTop={descriptors[el.key]?.options?.bottom ? 'auto' : undefined}
                        flexDirection='row'
                    >
                        {Icon && <Icon width={SIZE} height={SIZE} fill={currentKey === el.key ? 'navy' : '#000'} />}
                        {renderIcon({ size: SIZE })}
                        <StyledText
                            marginLeft='24px'
                            color={currentKey === el.key ? 'navy' : '#000'}
                        >{title}</StyledText>
                    </StyledButton>
                )
            })}
        </StyledView>
    )
}