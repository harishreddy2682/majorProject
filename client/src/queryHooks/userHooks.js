import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from 'axios'

axios.defaults.withCredentials = true

const register = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.post('http://localhost:5000/api/user/register', data, config)
}

export const useRegister = () => {
    return useMutation(register)
}

const login = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.post('http://localhost:5000/api/user/login', data, config)
}

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation(login, {
        onSuccess: () => {
            queryClient.invalidateQueries('logged-user')
        }
    })
}

const logout = () => {
    return axios.get('http://localhost:5000/api/user/logout')
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries('logged-user')
            queryClient.setQueryData('logged-user', () => {
                return undefined
            })
        }
    })
}

const updateProfile = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.post('http://localhost:5000/api/user/profile', data, config)
}

export const useUpdateProfileDetails = () => {
    const queryClient = useQueryClient()
    return useMutation(updateProfile, {
        onSuccess: async () => {
            queryClient.invalidateQueries('profile-data')
        }
    })
}

const getProfileData = () => {
    return axios.get('http://localhost:5000/api/user/profile')
}

export const useProfileData = () => {
    return useQuery('profile-data', getProfileData)
}