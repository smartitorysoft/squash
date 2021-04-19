import React from 'react';
import { Modal } from '@material-ui/core';
import { TextInput } from '../TextInput/TextInput';
import { BasicButton } from '../BasicButton/BasicButton';
import styles from '../../styles/ReserveModal.module.css';

export const ProfileModal = ({ open, onClose }) => (
	<div>
		<Modal open={open} onClose={onClose}>
			<div className={styles.modal}>
				<TextInput label='Vezetéknév' />
				<TextInput label='Keresztnév' />
				<TextInput label='Email cím' />
				<TextInput label='Telefonszám' type='number' />
				<BasicButton
					label='Változtat'
					onClick={() => {
						alert('clicked');
					}}
				/>
			</div>
		</Modal>
	</div>
);

export default ProfileModal;
