import {Action, combineReducers, configureStore, ThunkAction,} from '@reduxjs/toolkit';
import {homeAPI} from "../api/HomeAppService";

const rootReducer = combineReducers({
    [homeAPI.reducerPath]: homeAPI.reducer,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat(homeAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
