import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const userprofile = createAsyncThunk(
    'user/userprofile',
    async (id)=>{
        const config={
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        const response = await axios(`http://127.0.0.1:8000/guest/${id}/`, config);
        return response.data
    }
)

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        itemsInCart:[],
        itemsUsers: {
            isAuthenticated: null,
            username:'',
            pk:'',
            isStaff:'',
        },
        itemsInPut:{},
        itemsBooking:{}
    },
    reducers: {
        setItemInCart: (state, action) => {
            state.itemsInCart.push(action.payload)
        },
        deleteItemFromCart: (state, action) =>
            state.itemsInCart = state.itemsInCart.filter(item => item.pk !== action.payload)
        ,
        Setusername: (state, action) => {
            state.itemsUsers.username = action.payload
        },
        Setauther: (state, action) => {
            state.itemsUsers.isAuthenticated = action.payload
        },
        Setauthernone: (state, action) => {
            state.itemsUsers.isAuthenticated = false
        },
        Setpk: (state, action) => {
            state.itemsUsers.pk = action.payload
        },
        SetisStaff: (state, action) => {
            state.itemsUsers.isStaff = action.payload
        },
        setItemInPut: (state, action) => {
            state.itemsInPut= action.payload
        },
        setItemInBooking: (state, action) => {
            state.itemsBooking= action.payload
        },
        resetCart: (state, action) => {
            state.itemsInCart= []
        },
        // Setpk1: (state, action) => {
        //     state.itemsBooking.pk = action.payload
        // },
        // Setservice: (state, action) => {
        //     state.itemsBooking.service = action.payload
        // },
        // Settime: (state, action) => {
        //     state.itemsBooking.time = action.payload
        // },
        // Setcheck: (state, action) => {
        //     state.itemsBooking.check = action.payload
        // },
        // Setnote: (state, action) => {
        //     state.itemsBooking.note = action.payload
        // },

    },
    extraReducers:(builder) =>{
        builder.addCase(userprofile.fulfilled, (state,action)=>{
            state.itemsUsers.isStaff = action.payload.is_staff
        })






}}
);

export const {setItemInCart, deleteItemFromCart, Setauther, Setauthernone, Setusername, Setpk, SetisStaff, setItemInPut, setItemInBooking, resetCart} = cartSlice.actions;
export default cartSlice.reducer;