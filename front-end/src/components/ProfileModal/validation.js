import * as Yup from 'yup'

export const validation = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    phone: Yup.number().required('Required'),
});