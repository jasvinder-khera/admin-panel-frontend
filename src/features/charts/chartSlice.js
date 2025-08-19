import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chartData: {
        labels: [],
        datasets:[{data:[]}]
    },
    chartType: 'bar'
};

const chartSlice = createSlice({
    name:"charts",
    initialState,
    reducers:{
        setChartData: (state,action)=>{
            state.chartData = action.payload;
        },
        setChartType:(state,action)=>{
            state.chartType = action.payload;
        }
    }
})
export const {setChartData,setChartType} = chartSlice.actions;
export default chartSlice.reducer;