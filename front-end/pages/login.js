import Login from "../src/views/Login";

const Templates = props => <Login {...props} />;
Templates.getInitialProps = async ctx => {
	const { store, query } = ctx;
	try {
		await pageRedirect({ auth: true, url: `/sign-in` }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ["templates", "error", "global"],
		query
	};
};
export default Templates;

// import BasicButton from "../src/components/BasicButton";
// import TextInput from "../src/components/TextInput";
// import styles from '../styles/Login.module.css'
// import {useRouter} from 'next/router'

// export default function Login() {
//     const router = useRouter();
//     console.log(router);

//     return (
//       <div className={styles.container}>
//         <div className={styles.fields}>
//             <TextInput label='Email cím' />
//             <TextInput label='Jelszó' type='password'/>
//             </div>
//         <div className={styles.buttons}>
//             <BasicButton label='Belépés'/>
//             <BasicButton onClick={() => {
//                 console.log('clicked');
//                 router.push('/register')}
//                 } 
//                 label='Regisztráció'/>
//         </div>
//       </div>
//     )
  // }

