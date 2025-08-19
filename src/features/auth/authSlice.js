import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakelogin, fakeLogout } from "../../services/auth";

export const login = createAsyncThunk