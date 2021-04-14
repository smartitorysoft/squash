import React from 'react';
import styles from '../styles/Home.module.css';
import { HomeHeader } from '../src/components/HomeHeader/HomeHeader';

export default function Home() {
	return (
		<div className={styles.container}>
			<HomeHeader />
		</div>
	);
}
