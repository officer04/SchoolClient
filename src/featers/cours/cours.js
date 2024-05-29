import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../index';

export const createCours = createAsyncThunk('cours/createCours', async (payload, thunkAPI) => {
  try {
    const response = await instance.post(`/cours`, payload);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const createUserCours = createAsyncThunk(
  'cours/createUserCours',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/user`, payload);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteCours = createAsyncThunk('cours/deleteCours', async (coursId, thunkAPI) => {
  try {
    const response = await instance.delete(`/cours/${coursId}`);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeCours = createAsyncThunk('cours/changeCours', async (payload, thunkAPI) => {
  try {
    const response = await instance.patch(`/cours/${payload.courdId}`, payload.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createModule = createAsyncThunk('cours/createModule', async (payload, thunkAPI) => {
  try {
    const response = await instance.post(`/module`, payload);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteModule = createAsyncThunk('cours/deleteModule', async (moduleId, thunkAPI) => {
  try {
    const response = await instance.delete(`/module/${moduleId}`);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getModuleOne = createAsyncThunk('cours/getModuleOne', async (moduleId, thunkAPI) => {
  try {
    const response = await instance.get(`/module/details/${moduleId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeModule = createAsyncThunk('cours/changeModule', async (payload, thunkAPI) => {
  try {
    const response = await instance.patch(`/module/${payload.moduleId}`, payload.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCourses = createAsyncThunk('cours/getCourses', async (_, thunkAPI) => {
  try {
    const response = await instance.get(`/cours`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCoursUser = createAsyncThunk('cours/getCoursUser', async (_, thunkAPI) => {
  try {
    const response = await instance.get(`/cours/student`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCoursOne = createAsyncThunk('cours/getCoursOne', async (payload, thunkAPI) => {
  try {
    const response = await instance.get(`/cours/${payload}`);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// export const getCoursModule = createAsyncThunk('cours/getCoursModule', async (_, thunkAPI) => {
//   try {
//     const response = await instance.get(`/module`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const getCoursModule = createAsyncThunk(
  'cours/getCoursModule',
  async (coursId, thunkAPI) => {
    try {
      const response = await instance.get(`/module/${coursId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCoursModuleAll = createAsyncThunk(
  'cours/getCoursModuleAll',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/module`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCoursModuleLesson = createAsyncThunk(
  'cours/getCoursModuleLesson',
  async (moduleId, thunkAPI) => {
    try {
      const response = await instance.get(`/lesson/${moduleId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createLesson = createAsyncThunk('cours/createLesson', async (lessonInfo, thunkAPI) => {
  try {
    const response = await instance.post(`/lesson`, lessonInfo);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteLesson = createAsyncThunk('cours/deleteLesson', async (lessonInfo, thunkAPI) => {
  try {
    const response = await instance.delete(`/lesson/${lessonInfo}`);
    return response;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeLesson = createAsyncThunk('cours/changeLesson', async (lessonInfo, thunkAPI) => {
  try {
    const response = await instance.patch(`/lesson/${lessonInfo}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getLessonOne = createAsyncThunk('cours/getLessonOne', async (lessonId, thunkAPI) => {
  try {
    const response = await instance.get(`/lesson/details/${lessonId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const coursSlice = createSlice({
  name: 'cours',
  initialState: {
    courses: [],
    modules: [],
    lessonsInfo: [],
    lesson: {},
    cours: {},
    module: {},
    isLoading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(changeCours.fulfilled, (state, { payload }) => {
      state.cours = payload;
      // state.isLoading = false;
    });
    builder.addCase(getCoursUser.pending, (state) => {
      state.courses = [];
      state.isLoading = false;
    });
    builder.addCase(getCoursUser.fulfilled, (state, { payload }) => {
      state.courses = payload;
      state.isLoading = true;
    });
    builder.addCase(getCourses.pending, (state) => {
      state.courses = [];
      state.isLoading = false;
    });
    builder.addCase(getCoursModuleAll.pending, (state) => {
      state.modules = [];
      state.isLoading = false;
    });
    builder.addCase(getCoursModuleAll.fulfilled, (state, { payload }) => {
      state.modules = payload;
      state.isLoading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, { payload }) => {
      state.courses = payload;
      state.isLoading = true;
    });
    builder.addCase(getCoursModule.fulfilled, (state, { payload }) => {
      state.modules = payload;
      state.isLoading = true;
    });
    builder.addCase(getCoursModule.pending, (state) => {
      state.modules = [];
      state.isLoading = false;
    });
    builder.addCase(getCoursModuleLesson.pending, (state) => {
      state.isLoading = false;
      state.lessonsInfo = [];
    });
    builder.addCase(getCoursModuleLesson.fulfilled, (state, { payload }) => {
      state.lessonsInfo = payload;
      state.isLoading = true;
    });
    builder.addCase(getCoursOne.pending, (state) => {
      state.cours = {};
      state.isLoading = false;
    });
    builder.addCase(getModuleOne.fulfilled, (state, { payload }) => {
      state.module = payload;
      // state.isLoading = false;
    });
    builder.addCase(getCoursOne.fulfilled, (state, { payload }) => {
      state.cours = payload;
    });
    builder.addCase(getLessonOne.fulfilled, (state, { payload }) => {
      state.lesson = payload;
      state.isLoading = true;
    });
    builder.addCase(createModule.pending, (state, { payload }) => {
      // state.cours = payload;
    });
    builder.addCase(createModule.fulfilled, (state, { payload }) => {
      // state.modules = payload;
      state.modules.push(payload);
    });
  },
});

export const {} = coursSlice.actions;

export default coursSlice.reducer;
