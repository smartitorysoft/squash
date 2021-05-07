import * as Yup from 'yup';

export const validation = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    phone: Yup.number().required('Required'),
    password: Yup.string().required('Required'),
    passwordCheck: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
        .required('Required'),
});