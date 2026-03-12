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

                // Merge strategy to prevent render sleeping from wiping local cache
                const mergeData = (existing, incoming) => {
                    if (!incoming || incoming.length === 0) return existing;

                    const itemMap = new Map();
                    // Keep existing items first
                    if (Array.isArray(existing)) {
                        existing.forEach(item => itemMap.set(item._id || item.id, item));
                    }
                    // Overwrite with any incoming items from backend
                    if (Array.isArray(incoming)) {
                        incoming.forEach(item => itemMap.set(item._id || item.id, item));
                    }

                    // Convert back to array and sort by date descending
                    return Array.from(itemMap.values()).sort((a, b) => {
                        const dateA = a.date ? new Date(a.date).getTime() : 0;
                        const dateB = b.date ? new Date(b.date).getTime() : 0;
                        return dateB - dateA;
                    });
                };

                if (path === 'notes') state.notes = mergeData(state.notes, data);
                if (path === 'syllabus') state.syllabus = mergeData(state.syllabus, data);
                if (path === 'events') state.events = mergeData(state.events, data);
                if (path === 'question-papers') state.questionPapers = mergeData(state.questionPapers, data);
            })
            .addCase(fetchResources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearResources } = resourceSlice.actions;
export default resourceSlice.reducer;
