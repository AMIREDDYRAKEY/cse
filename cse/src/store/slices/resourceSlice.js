import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = "https://cse-rockers-server.onrender.com/api";

export const fetchResources = createAsyncThunk(
    'resources/fetchAll',
    async (resourcePath) => {
        const response = await fetch(`${API_BASE_URL}/${resourcePath}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        return { path: resourcePath, data };
    }
);

const resourceSlice = createSlice({
    name: 'resources',
    initialState: {
        notes: [],
        syllabus: [],
        events: [],
        questionPapers: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearResources: (state) => {
            state.notes = [];
            state.syllabus = [];
            state.events = [];
            state.questionPapers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchResources.fulfilled, (state, action) => {
                state.loading = false;
                const { path, data } = action.payload;
                if (path === 'notes') state.notes = data;
                if (path === 'syllabus') state.syllabus = data;
                if (path === 'events') state.events = data;
                if (path === 'question-papers') state.questionPapers = data;
            })
            .addCase(fetchResources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearResources } = resourceSlice.actions;
export default resourceSlice.reducer;
