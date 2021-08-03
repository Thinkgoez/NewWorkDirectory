import React from 'react';
import { processColor, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-charts-wrapper';

import { StyledView } from '../components/common/SimpleComponents';

const data = {
    dataSets: [
        {
            values: [5, 40, 77, 81, 43],
            label: 'grivnas',
            config: {
                color: processColor('#c0e5fe') // for bars
            }
        },
    ],
    
}

const Chart = () => {
    const handleSelect = ({ nativeEvent, ...props }) => {
        // nativeEvent: {x, y}
    }
    return (
        <StyledView flex={1} justifyContent='flex-end' backgroundColor='#c9c9c9'>
            <BarChart
                data={data}
                height={220}
                drawValueAboveBar
                scaleEnabled
                dragEnabled
                drawBorders
                noDataText='There is no data'
                borderColor={processColor('#c0c0c0')}
                gridBackgroundColor={processColor('#fff')}
                zoom={{
                    scaleX: 1,
                    scaleY: 1,
                    xValue: 0,
                    yValue: 0,
                }}
                visibleRange={{ x: { max: 3 }}}
                style={styles.barChart}
                chartBackgroundColor={processColor('#f0f0c0')}
                onSelect={handleSelect}
                chartDescription={{
                    text: 'Simple bar',
                    positionY: 550,
                    positionX: 1000
                }}
                marker= {{
                    enabled: true,
                    digits: 2,
                    markerColor: processColor('#f030c0'),
                    textColor: processColor('#fff'),
                    textSize: 14
                }}
            />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    barChart: {
    }
})
export default Chart