import BasicButton from "../../../src/components/BasicButton";
import TextInput from "../../../src/components/TextInput";
import styles from "../../../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <TextInput label="Email cím" />
        <TextInput label="Jelszó" type="password" />
      </div>
      <div className={styles.buttons}>
        <BasicButton label="Belépés" />
        <BasicButton
          onClick={() => {
            router.push("/register");
          }}
          label="Regisztráció"
        />
      </div>
    </div>
  );
}
