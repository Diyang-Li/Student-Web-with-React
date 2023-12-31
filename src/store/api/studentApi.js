import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/",
        prepareHeaders:(headers,{getState})=>{
            const token = getState().auth.token;
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ['student'],
    endpoints(build) {

        return {
            getStudents: build.query({
                query() {
                    return {
                        url:'students',
                        headers:{
                            Authorization:''
                        }
                    };
                },

                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },

                providesTags: [{type: 'student', id: 'LIST'}]
            }),
            getStudentById: build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60,
                providesTags: (result, error, id) => [{type: 'student', id}]
            }),
            delStudent: build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                        url: `students/${id}`,
                        method: 'delete'
                    };
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: {data: stu}
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: {data: stu.attributes}
                    };
                },
                invalidatesTags: ((result, error, stu) =>
                    [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            }),

        };
    }
});

export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;
