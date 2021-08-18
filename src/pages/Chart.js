import React, { useContext } from 'react';
import { processColor } from 'react-native'
import { BarChart } from 'react-native-charts-wrapper';
import { ThemeContext } from 'styled-components';

import { StyledView } from '../components/common/SimpleComponents';

const Chart = () => {
    const theme =useContext(ThemeContext)
    const handleSelect = ({ nativeEvent, ...props }) => {
        // nativeEvent: {x, y}
    }
    const data = {
        dataSets: [
            {
                values: [5, 40, 77, 81, 43],
                label: 'grivnas',
                config: {
                    color: processColor('chartBarFILL') // for bars
                }
            },
        ],
    }
    return (
        <StyledView flex={1} justifyContent='flex-end' backgroundColor='chartPageBG'>
            <BarChart
                data={data}
                height={220}
                drawValueAboveBar
                scaleEnabled
                dragEnabled
                drawBorders
                noDataText='There is no data'
                borderColor={processColor(theme['chartBORDER'])}
                gridBackgroundColor={processColor(theme['secondary'])}
                zoom={{
                    scaleX: 1,
                    scaleY: 1,
                    xValue: 0,
                    yValue: 0,
                }}
                visibleRange={{ x: { max: 3 }}}
                chartBackgroundColor={processColor(theme['chartBG'])}
                onSelect={handleSelect}
                chartDescription={{
                    text: 'Simple bar',
                    positionY: 560,
                    positionX: 1000
                }}
                marker= {{
                    enabled: true,
                    digits: 2,
                    markerColor: processColor(theme['chartMarkerFILL']),
                    textColor: processColor(theme['chartMarker']),
                    textSize: 14
                }}
            />
        </StyledView>
    );
};

export default Chart