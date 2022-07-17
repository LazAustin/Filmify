import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import purchaseService from './purchaseService'



const initialState = {
    purchases: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: 'problem with fetching purchases'
}

//Create new Purchase
export const createPurchase = createAsyncThunk(
    'purchases/create', 
    async (purchaseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await purchaseService.createPurchase(purchaseData, token)
    } catch (error) {
        const message =
            (error.response && 
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get purchases
export const getPurchases = createAsyncThunk(
    'purchases/getAll', 
    async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await purchaseService.getPurchases(token)
    } catch (error) {
        const message =
            (error.response && 
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete Purchase
export const deletePurchase = createAsyncThunk(
    'purchases/delete', 
    async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await purchaseService.deletePurchase(id, token)
    } catch (error) {
        const message =
            (error.response && 
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update Purchase
export const updatePurchase = createAsyncThunk(
    'purchases/update',
    async (purchaseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await purchaseService.updatePurchase(purchaseData, token)
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPurchase.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPurchase.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true
                state.purchases.push(action.payload)
            })
            .addCase(createPurchase.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPurchases.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPurchases.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true
                state.purchases = action.payload
            })
            .addCase(getPurchases.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePurchase.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePurchase.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true
                state.purchases = state.purchases.filter((purchases) => purchases._id !== action.payload.id)})
            .addCase(deletePurchase.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true
                state.message = action.payload
            })
            .addCase(updatePurchase.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePurchase.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true
                state.purchases = state.purchases.map((purchase) => purchase._id === action.payload._id ? action.payload : purchase)
            })
            .addCase(updatePurchase.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true
                state.message = action.payload
            })

    }
})

export const {reset} = purchaseSlice.actions
export default purchaseSlice.reducer