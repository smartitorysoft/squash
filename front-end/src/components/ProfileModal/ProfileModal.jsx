import React from "react";
import { Modal } from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";
import { BasicButton } from "../BasicButton/BasicButton";
import styles from "../../../styles/ReserveModal.module.css";
import { useDispatch } from "react-redux";

export const ProfileModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.me.info);

  const [firstName, setFirst] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = () => {
    dispatch(
      setProfile({
        id: user.id,
        details: {
          profile: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
          },
        },
      })
    );
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className={styles.modal}>
          <TextInput
            label="Vezetéknév"
            onChange={(text) => setFirstName(text.target.value)}
          />
          <TextInput
            label="Keresztnév"
            onChange={(text) => setLastName(text.target.value)}
          />
          <TextInput
            label="Telefonszám"
            type="number"
            onChange={(text) => setPhone(text.target.value)}
          />
          <BasicButton label="Változtat" onClick={() => {}} />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
